import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const HeroSection: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#002244',
      wireframe: true,
      emissive: '#00ffff',
      emissiveIntensity: 0.5,
    });
  }, []);

  useFrame((state) => {
    if (!globeRef.current) return;

    globeRef.current.rotation.y += 0.001;

    const targetX = state.mouse.x * 0.2;
    const targetY = state.mouse.y * 0.2;
    globeRef.current.rotation.x = THREE.MathUtils.lerp(globeRef.current.rotation.x, targetY, 0.1);
    globeRef.current.rotation.z = THREE.MathUtils.lerp(globeRef.current.rotation.z, targetX, 0.1);

    const sectionProgress = scrollProgress * 4;
    if (sectionProgress <= 1) {
      const zoom = 1 - sectionProgress * 0.9;
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10 * zoom, 0.1);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={globeRef} args={[2, 64, 64]} material={material} />
      </Float>

      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#00ffff"
      >
        THE GATEWAY
      </Text>

      <mesh position={[0, 0, 2]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};
