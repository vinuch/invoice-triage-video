# Build Series VO Pipeline — Step by Step

Two nodes: **Mac** (recording, denoise, trim, normalize) and **Maria**
(homelab — transcription, timeline build, Remotion render).

## 1. Record (Mac)
- Record VO takes as `.m4a` voice memos.
- GOTCHA: takes are named ambiguously (location + index, e.g.
  "Owerri 90.m4a"). No episode ID in the filename. Verify each take's
  content/mtime against the actual recording session before using it —
  a stale take from an unrelated episode can silently get concatenated in.

## 2. Concat (Mac)
```
ffmpeg -i "<take1>.m4a" -i "<take2>.m4a" \
  -filter_complex "[0:a]aformat=sample_rates=44100:channel_layouts=mono[a0]; \
                   [1:a]aformat=sample_rates=44100:channel_layouts=mono[a1]; \
                   [a0][a1]concat=n=2:v=0:a=1[out]" \
  -map "[out]" build{N}_raw.wav
```
Sanity check duration immediately after:
```
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 build{N}_raw.wav
```

## 3. Denoise (Mac)
```
deepFilter build{N}_raw.wav -o build{N}_denoised
```
GOTCHA: torch must be pinned to 2.0.1 / torchaudio 2.0.2 for
DeepFilterNet3 compatibility. Output filename gets a `_DeepFilterNet3`
suffix appended automatically.

## 4. Silence trim (Mac)
```
ffmpeg -i build{N}_denoised/build{N}_raw_DeepFilterNet3.wav \
  -af silenceremove=start_periods=1:start_silence=0.1:start_threshold=-40dB:detection=peak,areverse,silenceremove=start_periods=1:start_silence=0.1:start_threshold=-40dB:detection=peak,areverse \
  build{N}_trimmed.wav
```
Note: this only trims leading/trailing silence, not internal pacing gaps.

## 5. Loudness normalize (Mac)
```
ffmpeg -i build{N}_trimmed.wav -af loudnorm=I=-16:TP=-1.5:LRA=11 build{N}_final.wav
```

## 6. Ship to Maria (Mac -> Maria)
```
zip build{N}_final.zip build{N}_final.wav
rsync -avP build{N}_final.zip vince@maria:~/build{N}-<project-name>/
```
GOTCHA: double check the target directory name matches the actual
project — don't assume it follows a fixed pattern.

## 7. Unzip + verify (Maria)
```
cd ~/build{N}-<project-name> && unzip build{N}_final.zip
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 build{N}_final.wav
```
Confirm duration matches the trimmed file from step 4/5.

## 8. Word-level transcription (Mac preferred over Maria — faster)
```
pip install -q faster-whisper --break-system-packages
python3 -c "
from faster_whisper import WhisperModel
model = WhisperModel('small', device='cpu', compute_type='int8')
segments, info = model.transcribe('build{N}_final.wav', word_timestamps=True)
with open('timestamps_build{N}.txt', 'w') as f:
    for seg in segments:
        for word in seg.words:
            f.write(f'{word.start:.2f} - {word.end:.2f}: {word.word}\n')
"
```
GOTCHAS:
- `openai-whisper` segfaults on this Mac (Apple Silicon, comfyenv) even
  on CPU — use `faster-whisper` instead, it's reliable.
- If trying openai-whisper anyway: `--device mps` fails outright because
  its word-timestamp DTW alignment hard-requires float64, unsupported on MPS.
- openai-whisper (when needed) lives in the `comfyenv` conda env, not base.

Ship the timestamps file to Maria if generated on the Mac:
```
rsync -avP timestamps_build{N}.txt vince@maria:~/build{N}-<project-name>/
```

## 9. Scene config (Maria)
Hand-build `build{N}-scene-config.json` mapping each beat in the
`FinalVideoBuild{N}.tsx` placeholder composition to a narration anchor word:
```
[
  { "id": "<BeatId>", "component": "<ComponentName>", "startWord": "<word>", "startOccurrence": <n>, "props": {...} }
]
```
Workflow for picking anchors:
1. `grep -in "<candidate word>" timestamps_build{N}.txt` to find all occurrences.
2. `grep -c " <word>"` to check occurrence count, watch for substring
   false-positives (e.g. "structure" vs "structured" — grep -c counts
   both as matches on the bare string but they're different tokens to
   the parser).
3. Confirm chapter-title beats and their paired diagram beats use two
   *different* anchor words a few seconds apart — using the same anchor
   for both collapses one beat to zero duration.
4. Any component requiring props not derivable from timing (chapter
   title/subtitle text, closing CTA text) needs `props` added manually
   in the scene-config — the placeholder composition had these hardcoded
   and they don't carry over automatically.

## 10. Build the timeline (Maria)
```
cd ~/invoice-triage-video
npx tsx scripts/parse-timestamps.ts \
  ~/build{N}-<project-name>/timestamps_build{N}.txt \
  ~/build{N}-<project-name>/build{N}-scene-config.json \
  build{N}Timeline \
  --out src/data/timeline/build{N}.ts
```
Fix any "zero or negative duration" warnings by adjusting
`startOccurrence` for the flagged word, then re-run.

KNOWN LIMITATION: if a script section (e.g. Architecture, Build
Walkthrough) runs long relative to how many beats the placeholder
composition allocated to it, one diagram may end up static on screen
for minutes. Fine for a first pass; needs sub-beat anchors + component
variants per sub-topic to fix properly later.

## 11. Wire the composition (Maria)
Replace the placeholder `FinalVideoBuild{N}.tsx` beats array with a
real `<Audio>` + timeline-driven render, following `FinalVideo.tsx`'s
pattern:
```
import {Audio, Sequence, staticFile} from 'remotion';
import {FPS} from '../design-tokens';
import {build{N}Timeline} from '../data/timeline/build{N}';
import {componentMap} from '../componentMap';

export const FinalVideoBuild{N}: React.FC = () => {
  let frameCursor = 0;
  return (
    <>
      <Audio src={staticFile('build{N}_final.wav')} />
      {build{N}Timeline.map((scene) => {
        const durationInFrames = Math.round((scene.endSec - scene.startSec) * FPS);
        const from = frameCursor;
        frameCursor += durationInFrames;
        const Component = componentMap[scene.component as keyof typeof componentMap];
        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <Component {...(scene.props ?? {})} />
          </Sequence>
        );
      })}
    </>
  );
};
```
Check every `component` name used in the scene-config is registered in
`componentMap.ts` before running.

## 12. Render (Maria)
Kick off the Remotion render for `FinalVideoBuild{N}`.

---

## Open items toward packaging as a Claude skill
- Run this 1-2 more times to confirm the steps generalize.
- Automate scene-config anchor discovery (script-vs-transcript diffing)
  instead of manual grep passes.
- Solve the long-section/single-diagram limitation from step 10.
- Turn the `{N}` / `<project-name>` placeholders into a proper
  parameterized skill script.
