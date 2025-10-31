import { useState, useEffect } from 'react';

/**
 * A custom React hook that tracks the state of a CSS media query.
 * @param {string} query The media query string to watch (e.g., '(max-width: 768px)').
 * @returns {boolean} Returns `true` if the media query matches the current state, otherwise `false`.
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener for modern browser compatibility
    mediaQueryList.addEventListener('change', listener);

    // Initial check in case state got stale between render and effect
    if (mediaQueryList.matches !== matches) {
        setMatches(mediaQueryList.matches);
    }
    
    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query, matches]);

  return matches;
};

export default useMediaQuery;