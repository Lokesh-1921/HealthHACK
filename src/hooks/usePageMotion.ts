import { useEffect, useRef, useState } from 'react';

export const motion = { interface: 260, entrance: 600, stagger: 65, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };

/** Enhance visible content; never leave it hidden if observers or animation fail. */
export function usePageMotion() {
  const [active, setActive] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const bursts = new WeakMap<Element, { started: number; count: number }>();
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
    const header = document.querySelector<HTMLElement>('.header');
    const artwork = document.querySelector<HTMLElement>('.hero-visual');
    let frame = 0;
    let fragmentFrame = 0;
    let disposed = false;
    let fragmentCancelled = false;
    let observer: IntersectionObserver | undefined;
    let artworkObserver: IntersectionObserver | undefined;
    let artworkVisible = false;
    const updateArtwork = () => {
      if (artwork) artwork.dataset.inView = String(artworkVisible && !preference.matches && !document.hidden);
    };
    const update = () => {
      frame = 0;
      const height = header?.getBoundingClientRect().height ?? 94;
      document.documentElement.style.setProperty('--header-offset', `${height + 20}px`);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      let current = 'home';
      for (const section of sections) if (section.getBoundingClientRect().top <= height + 24) current = section.id;
      // The short final section cannot always reach the header at the scroll limit.
      if (max > 0 && scrollY >= max - 2) current = sections[sections.length - 1]?.id ?? current;
      setActive(previous => previous === current ? previous : current);
      setShowBackToTop(scrollY > innerHeight * 0.7);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const stopMotion = () => {
      updateArtwork();
      if (preference.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', stopMotion);
    document.addEventListener('visibilitychange', updateArtwork);
    const headerResize = typeof ResizeObserver === 'function' && header ? new ResizeObserver(schedule) : undefined;
    if (headerResize && header) headerResize.observe(header);

    if (typeof IntersectionObserver === 'function') {
      try {
      observer = new IntersectionObserver(entries => {
        // Stagger only elements entering together, never by their absolute page index.
        const now = performance.now();
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target)) continue;
          seen.add(entry.target);
          observer?.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          element.dataset.revealed = 'true';
          const group = element.closest('[data-stagger]');
          // Expanding accordions reveal siblings across successive observer callbacks.
          // Keep that short burst together without delaying later scrolling sequences.
          const previous = group ? bursts.get(group) : undefined;
          const burst = previous && now - previous.started < motion.interface
            ? previous : { started: now, count: 0 };
          const position = group ? burst.count++ : 0;
          if (group) bursts.set(group, burst);
          if (preference.matches || typeof element.animate !== 'function') continue;
          try {
          const animation = element.animate([
            { opacity: 0, translate: '0 22px' },
            { opacity: 1, translate: '0 0' },
          ], { duration: motion.entrance, delay: Math.min(position, 3) * motion.stagger, easing: motion.easing, fill: 'both' });
          animations.add(animation);
          animation.finished.then(() => {
            animations.delete(animation);
            // Release entrance styles; individual translate keeps hover transforms independent.
            animation.cancel();
          }, () => animations.delete(animation));
          } catch { /* Default styles keep the content readable. */ }
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(element => observer?.observe(element));
      artworkObserver = new IntersectionObserver(entries => {
        artworkVisible = entries.some(entry => entry.isIntersecting);
        updateArtwork();
      }, { threshold: 0.05 });
      if (artwork) artworkObserver.observe(artwork);
      } catch { observer?.disconnect(); /* Content is visible without this enhancement. */ }
    }
    // Align direct links after fonts/load and the browser's scroll restoration.
    // A user's first interaction cancels this initial alignment; normal anchors stay native.
    const initialHash = location.hash;
    const cancelFragment = () => { fragmentCancelled = true; };
    const fragmentEvents = ['pointerdown', 'wheel', 'touchstart', 'keydown'] as const;
    const removeFragmentListeners = () => fragmentEvents.forEach(type => window.removeEventListener(type, cancelFragment));
    const alignFragment = () => {
      document.fonts.ready.then(() => {
        if (disposed || fragmentCancelled || location.hash !== initialHash) return;
        fragmentFrame = requestAnimationFrame(() => {
          fragmentFrame = requestAnimationFrame(() => {
            if (!disposed && !fragmentCancelled && location.hash === initialHash) {
              document.getElementById(fragment)?.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
            removeFragmentListeners();
          });
        });
      });
    };
    let fragment = initialHash.slice(1);
    if (initialHash) {
      try { fragment = decodeURIComponent(fragment); } catch { /* Keep malformed fragments harmless. */ }
      fragmentEvents.forEach(type => window.addEventListener(type, cancelFragment, { passive: true }));
      if (document.readyState === 'complete') alignFragment();
      else window.addEventListener('load', alignFragment, { once: true });
    }
    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      if (fragmentFrame) cancelAnimationFrame(fragmentFrame);
      window.removeEventListener('load', alignFragment);
      removeFragmentListeners();
      observer?.disconnect();
      artworkObserver?.disconnect();
      if (artwork) delete artwork.dataset.inView;
      headerResize?.disconnect();
      animations.forEach(animation => animation.cancel());
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', stopMotion);
      document.removeEventListener('visibilitychange', updateArtwork);
    };
  }, []);

  return { active, progressRef, showBackToTop };
}
