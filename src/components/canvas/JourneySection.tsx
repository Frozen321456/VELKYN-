import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const JourneySection: React.FC = () => {
  const boxRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  // Define the logistics journey path: Warehouse -> Customs -> Transit -> Delivery
  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, -20), // Warehouse (China)
      new THREE.Vector3(-5, 0, -15),  // Customs
      new THREE.Vector3(0, -2, -10),  // Transit (Sea)
      new THREE.Vector3(10, 0, 0),    // Arrival (Bangladesh)
    ]);
  }, []);

  useFrame((state) => {
    if (!boxRef.current) return;

    // Section 2 corresponds to progress 0.25 -> 0.5
    const sectionProgress = (scrollProgress - 0.25) * 4;

    if (sectionProgress >= 0 && sectionProgress <= 1) {
      const point = path.getPointAt(sectionProgress);
      boxRef.current.position.copy(point);

      // Look ahead in the path
      const tangent = path. tangents.length > 0
        ? path.getTangentAt(sectionProgress)
        : new THREE.Vector3(1, 0, 0);

      const lookAtTarget = new THREE.Vector3().addVectors(point, tangent);
      boxRef.current.lookAt(lookAtTarget);

      // Smooth camera chase
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, point.x + 2, 0.1);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, point.y + 2, 0.1);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, point.z + 5, 0.1);
      state.camera.lookAt(point);
    }
  });

  return (
    <group>
      {/* The Cargo Box */}
      <mesh ref={boxRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.5} />
      </mesh>

      {/* Warehouse Zone */}
      <group position={[-10, 0, -20]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[4, 2, 4]} />
          <meshStandardMaterial color="#333" transparent opacity={0.5} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.4} color="white">WAREHOUSE (CN)</Text>
      </group>

      {/* Customs Zone */}
      <group position={[-5, 0, -15]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.3} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.4} color="#00ffff">CUSTOMS GATE</Text>
      </group>

      {/* Transit Zone (Water) */}
      <group position={[0, -2, -10]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#001133" />
        </mesh>
        <Text position={[0, 1, 0]} fontSize={0.4} color="#00ffff">TRANSIT (SEA)</Text>
      </group>

      {/* Arrival Zone */}
      <group position={[10, 0, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 2]} />
          <meshStandardMaterial color="#666" />
        </mesh>
        <Text position={[0, 2, 0]} fontSize={0.4} color="white">ARRIVAL (BD)</Text>
      </group>
    </group>
  );
};
