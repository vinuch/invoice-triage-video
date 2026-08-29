import re

path = "src/Root.tsx"
with open(path) as f:
    content = f.read()

start_marker = "{/* Episode 2 — hook + close (bookend pattern, matching Episode 1) */}"
start_idx = content.index(start_marker)

# End: the closing "/>" of the Ep2-LayoutAwareness composition block
layout_idx = content.index('id="Ep2-LayoutAwareness"')
end_idx = content.index("/>", layout_idx) + len("/>")

replacement = """{/* Episode 2 — driven by episode02Timeline (word-timestamp derived) */}
{episode02Timeline.map((scene) => (
  <Composition
    key={scene.id}
    id={scene.id}
    component={componentMap[scene.component as keyof typeof componentMap]}
    durationInFrames={Math.round((scene.endSec - scene.startSec) * FPS)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={scene.props}
  />
))}"""

new_content = content[:start_idx] + replacement + content[end_idx:]

with open(path, "w") as f:
    f.write(new_content)

print(f"Replaced {end_idx - start_idx} chars with {len(replacement)} chars.")
