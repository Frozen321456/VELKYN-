import React from 'react';
import { WorldScene } from './components/canvas/WorldScene';
import { Overlay } from './components/ui/Overlay';
import { useScrollTimeline } from './hooks/useScrollTimeline';
import Lenis from 'lenis';
import './App.css';

function App() {
  // Initialize the scrollytelling timeline
  useScrollTimeline();

  // Initialize smooth scrolling
  React.useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="app-container">
      <WorldScene />
      <Overlay />

      {/* The Virtual Scroll Track */}
      <div className="scroll-track" style={{ height: '400vh' }} />
    </div>
  );
}

export default App;
