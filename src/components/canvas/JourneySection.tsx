import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const JourneySection: React.FC = () => {
  const boxRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, -20),
      new THREE.Vector3(-5, 0, -15),
      new THREE.Vector3(0, -2, -10),
      new THREE.Vector3(10, 0, 0),
    ]);
  }, []);

  useFrame((state) => {
    if (!boxRef.current) return;

    const sectionProgress = (scrollProgress - 0.25) * 4;

    if (sectionProgress >= 0 && sectionProgress <= 1) {
      const point = path.getPointAt(sectionProgress);
      boxRef.current.position.copy(point);

      const tangent = path.getTangentAt(sectionProgress);
      const lookAtTarget = new THREE.Vector3().addVectors(point, tangent);
      boxRef.current.lookAt(lookAtTarget);

      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, point.x + 2, 0.1);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, point.y + 2, 0.1);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, point.z + 5, 0.1);
      state.camera.lookAt(point);
    }
  });

  return (
    <group>
      <mesh ref={boxRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.5} />
      </mesh>

      <group position={[-10, 0, -20]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[4, 2, 4]} />
          <meshStandardMaterial color="#333" transparent opacity={0.5} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.4} color="white">WAREHOUSE (CN)</Text>
      </group>

      <group position={[-5, 0, -15]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.3} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.4} color="#00ffff">CUSTOMS GATE</Text>
      </group>

      <group position={[0, -2, -10]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#001133" />
        </mesh>
        <Text position={[0, 1, 0]} fontSize={0.4} color="#00ffff">TRANSIT (SEA)</Text>
      </group>

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
