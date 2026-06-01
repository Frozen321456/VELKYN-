import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  // Simple stylized globe material
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

    // Subtle auto-rotation
    globeRef.current.rotation.y += 0.001;

    // Mouse parallax
    const targetX = state.mouse.x * 0.2;
    const targetY = state.mouse.y * 0.2;
    globeRef.current.rotation.x = THREE.MathUtils.lerp(globeRef.current.rotation.x, targetY, 0.1);
    globeRef.current.rotation.z = THREE.MathUtils.lerp(globeRef.current.rotation.z, targetX, 0.1);

    // Scroll Animation: Zoom into the globe
    // progress 0 -> 0.25 (Section 1)
    const sectionProgress = scrollProgress * 4;
    if (sectionProgress <= 1) {
      const zoom = 1 - sectionProgress * 0.9; // Zoom in effect
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10 * zoom, 0.1);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={globeRef} args={[2, 64, 64]} material={material} />
      </Float>

      {/* Floating Title (UI will handle the main text, but we add a 3D one for depth) */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#00ffff"
      >
        THE GATEWAY
      </Text>

      {/* Stylized Cargo Ship / Plane placeholder */}
      <mesh position={[0, 0, 2]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};
