import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { HeroSection } from './HeroSection';
import { JourneySection } from './JourneySection';
import { AnatomySection } from './AnatomySection';
import { HubSection } from './HubSection';

export const WorldScene: React.FC = () => {
  const activeSection = useStore((state) => state.activeSection);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#050505'
      }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 50]} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <pointLight position={[-10, -10, -10]} color="cyan" intensity={1} />

      <Suspense fallback={null}>
        <Environment preset="city" />

        {/* We render all sections, but they are positioned in world-space
            and animated via the global scroll progress. */}
        <HeroSection />
        <JourneySection />
        <AnatomySection />
        <HubSection />
      </Suspense>

      {/* OrbitControls only for debugging, normally removed for scrollytelling */}
      {/* <OrbitControls enableZoom={false} /> */}
    </Canvas>
  );
};
