import { useEffect, useRef, useState } from 'react';

export const motion = { interface: 260, entrance: 520, stagger: 65, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };

/** Enhance visible content; never leave it hidden if observers or animation fail. */
export function usePageMotion() {
  const [active, setActive] = useState('home');
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
    const header = document.querySelector<HTMLElement>('.header');
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const update = () => {
      frame = 0;
      const height = header?.getBoundingClientRect().height ?? 94;
      document.documentElement.style.setProperty('--header-offset', `${height + 20}px`);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      let current = 'home';
      for (const section of sections) if (section.getBoundingClientRect().top <= height + 24) current = section.id;
      setActive(previous => previous === current ? previous : current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const stopMotion = () => {
      if (preference.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', stopMotion);
    const headerResize = typeof ResizeObserver === 'function' && header ? new ResizeObserver(schedule) : undefined;
    if (headerResize && header) headerResize.observe(header);

    if (typeof IntersectionObserver === 'function') {
      try {
      observer = new IntersectionObserver(entries => {
        // Stagger only elements entering together, never by their absolute page index.
        const groups = new Map<Element, number>();
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target)) continue;
          seen.add(entry.target);
          observer?.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          element.dataset.revealed = 'true';
          const group = element.closest('[data-stagger]');
          const position = group ? groups.get(group) ?? 0 : 0;
          if (group) groups.set(group, position + 1);
          if (preference.matches || typeof element.animate !== 'function') continue;
          try {
          const animation = element.animate([
            { opacity: 0, transform: 'translateY(18px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: motion.entrance, delay: Math.min(position, 3) * motion.stagger, easing: motion.easing, fill: 'both' });
          animations.add(animation);
          animation.finished.then(() => {
            animations.delete(animation);
            // Release the transform so hover feedback is not overridden by fill mode.
            animation.cancel();
          }, () => animations.delete(animation));
          } catch { /* Default styles keep the content readable. */ }
        }
      }, { threshold: 0.01, rootMargin: '0px 0px -24px 0px' });
      document.querySelectorAll('.reveal').forEach(element => observer?.observe(element));
      } catch { observer?.disconnect(); /* Content is visible without this enhancement. */ }
    }
    // CSR fragment URLs can arrive before React has mounted their target.
    if (location.hash) {
      let fragment = location.hash.slice(1);
      try { fragment = decodeURIComponent(fragment); } catch { /* Keep malformed fragments harmless. */ }
      const target = document.getElementById(fragment);
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
    }
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      headerResize?.disconnect();
      animations.forEach(animation => animation.cancel());
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', stopMotion);
    };
  }, []);

  return { active, progressRef };
}
