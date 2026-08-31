import React from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import * as THREE from 'three';

type Stage = {
  label: string;
  position: [number, number, number];
};

type PipelineFlow3DProps = {
  stages?: Stage[];
  title?: string;
};

const defaultStages: Stage[] = [
  {label: 'Ingest', position: [-4, 0, 0]},
  {label: 'Extract', position: [-1.5, 0, 0]},
  {label: 'Validate', position: [1.5, 0, 0]},
  {label: 'Store', position: [4, 0, 0]},
];

const Node: React.FC<{stage: Stage; activeAt: number; frame: number}> = ({
  stage,
  activeAt,
  frame,
}) => {
  const lit = frame >= activeAt;
  const scale = interpolate(frame, [activeAt - 10, activeAt], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <group position={stage.position}>
      <mesh scale={scale}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color={lit ? '#7c3aed' : '#333'}
          emissive={lit ? '#7c3aed' : '#000'}
          emissiveIntensity={lit ? 0.6 : 0}
        />
      </mesh>
    </group>
  );
};

export const PipelineFlow3D: React.FC<PipelineFlow3DProps> = ({
  stages = defaultStages,
  title,
}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();

  const angle = interpolate(frame, [0, fps * 8], [0, Math.PI * 0.4], {
    extrapolateRight: 'clamp',
  });
  const camX = Math.sin(angle) * 10;
  const camZ = Math.cos(angle) * 10;

  const activeStarts = stages.map((_, i) => 20 + i * 15);

  return (
    <ThreeCanvas width={width} height={height}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 8, 5]} intensity={1.2} />
      <perspectiveCamera
        makeDefault
        position={[camX, 2, camZ]}
        onUpdate={(cam) => cam.lookAt(new THREE.Vector3(0, 0, 0))}
      />

      <line>
        <bufferGeometry
          onUpdate={(geo) =>
            geo.setFromPoints(stages.map((s) => new THREE.Vector3(...s.position)))
          }
        />
        <lineBasicMaterial color="#555" />
      </line>

      {stages.map((stage, i) => (
        <Node key={stage.label} stage={stage} activeAt={activeStarts[i]} frame={frame} />
      ))}
    </ThreeCanvas>
  );
};
