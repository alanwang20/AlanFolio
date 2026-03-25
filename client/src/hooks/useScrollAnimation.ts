import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.05) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fallback: always become visible after a short delay in case
    // IntersectionObserver misfires (common on iOS Safari)
    const fallback = setTimeout(() => setIsVisible(true), 800);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallback);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      clearTimeout(fallback);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}
