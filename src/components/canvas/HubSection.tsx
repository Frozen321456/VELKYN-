import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const HubSection: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  // Section 4: progress 0.75 -> 1.0
  const sectionProgress = (scrollProgress - 0.75) * 4;

  const articles = [
    { id: '1', title: 'Import Duties 2026', color: '#00ffff' },
    { id: '2', title: 'Shipping Rate Trends', color: '#ffd700' },
    { id: '3', title: 'Customs Guide', color: '#ffffff' },
    { id: '4', title: 'Logistics Tech', color: '#00ffff' },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotate the carousel based on scroll progress
    groupRef.current.rotation.y = sectionProgress * Math.PI * 2;

    // Parallax depth effect for the camera
    const zoom = 1 + sectionProgress * 2;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10 / zoom, 0.1);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group position={[0, 0, -20]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={groupRef}>
          {articles.map((art, i) => {
            const angle = (i / articles.length) * Math.PI * 2;
            const x = Math.cos(angle) * 5;
            const z = Math.sin(angle) * 5;

            return (
              <group key={art.id} position={[x, 0, z]} rotation={[0, -angle, 0]}>
                <mesh>
                  <boxGeometry args={[2, 3, 0.1]} />
                  <MeshDistortMaterial
                    color={art.color}
                    speed={2}
                    distort={0.2}
                    roughness={0}
                    metalness={1}
                    transparent
                    opacity={0.7}
                  />
                </mesh>
                <Text
                  position={[0, 0, 0.1]}
                  fontSize={0.2}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  {art.title}
                </Text>
              </group>
            );
          })}
        </group>
      </Float>
    </group>
  );
};
