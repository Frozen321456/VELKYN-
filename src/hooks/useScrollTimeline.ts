import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store/useStore';

gsap.registerPlugin(ScrollTrigger);

export const useScrollTimeline = () => {
  const setScrollProgress = useStore((state) => state.setScrollProgress);
  const setActiveSection = useStore((state) => state.setActiveSection);

  useEffect(() => {
    const totalSections = 4;

    const scrollTrack = document.createElement('div');
    scrollTrack.style.height = `${totalSections * 100}vh`;
    scrollTrack.style.position = 'absolute';
    scrollTrack.style.top = '0px';
    scrollTrack.style.left = '0px';
    scrollTrack.style.width = '1px';
    scrollTrack.style.pointerEvents = 'none';
    document.body.appendChild(scrollTrack);

    gsap.to({}, {
      scrollTrigger: {
        trigger: scrollTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);

          const sectionIndex = Math.min(
            Math.floor(self.progress * totalSections),
            totalSections - 1
          );
          setActiveSection(sectionIndex);
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (document.body.contains(scrollTrack)) {
        document.body.removeChild(scrollTrack);
      }
    };
  }, [setActiveSection, setScrollProgress]);
};
