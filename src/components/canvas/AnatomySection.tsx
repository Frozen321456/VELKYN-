import React, { useRef } from 'react';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const AnatomySection: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const setHoveredAssetId = useStore((state) => state.setHoveredAssetId);

  const sectionProgress = (scrollProgress - 0.5) * 4;

  const assets = [
    { id: 'gps', name: 'Real-time Tracking', color: '#00ffff', offset: new THREE.Vector3(2, 1, 0) },
    { id: 'hull', name: 'Safety & Insurance', color: '#ffd700', offset: new THREE.Vector3(-2, 0, 1) },
    { id: 'key', name: 'Customs Mastery', color: '#ffffff', offset: new THREE.Vector3(0, -1, 2) },
  ];

  return (
    <group position={[0, 0, -10]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          {assets.map((asset) => {
            const currentOffset = new THREE.Vector3().copy(asset.offset).multiplyScalar(
              sectionProgress > 0 ? Math.min(sectionProgress * 2, 1) : 0
            );

            return (
              <mesh
                key={asset.id}
                position={currentOffset}
                onPointerOver={() => setHoveredAssetId(asset.id)}
                onPointerOut={() => setHoveredAssetId(null)}
              >
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial
                  color={asset.color}
                  emissive={asset.color}
                  emissiveIntensity={0.5}
                />
                <Text
                  position={[0, 0.6, 0]}
                  fontSize={0.2}
                  color="white"
                  anchorX="center"
                >
                  {asset.name}
                </Text>
              </mesh>
            );
          })}
        </group>
      </Float>
    </group>
  );
};
