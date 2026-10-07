import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, CSSProperties } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { motion } from '../hooks/usePageMotion';

const links = [['overview','Overview'],['tracks','Focus areas'],['timeline','Timeline'],['awards','Awards'],['committee','People']] as const;
const mobileLinks = [...links, ['registration','Registration'], ['contact','Contact']];

export default function Navigation({ active, registerHref, completed }: { active: string; registerHref: string; completed: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, width: 0, visible: false });
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const desktop = useRef<HTMLElement>(null);
  const desiredOpen = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const frames = useRef<number[]>([]);

  const close = useCallback((restoreFocus = false) => {
    desiredOpen.current = false;
    frames.current.forEach(cancelAnimationFrame);
    frames.current = [];
    clearTimeout(timer.current);
    setOpen(false);
    if (restoreFocus) button.current?.focus();
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : motion.interface;
    timer.current = window.setTimeout(() => setMounted(false), delay);
  }, []);

  const show = (focusFirst = false) => {
    desiredOpen.current = true;
    clearTimeout(timer.current);
    setMounted(true);
    // Give the mounted panel its closed style before starting its transition.
    frames.current.push(requestAnimationFrame(() => {
      frames.current.push(requestAnimationFrame(() => {
        if (!desiredOpen.current) return;
        setOpen(true);
        if (focusFirst) requestAnimationFrame(() => panel.current?.querySelector<HTMLAnchorElement>('a')?.focus());
      }));
    }));
  };

  useEffect(() => {
    const update = () => {
      const nav = desktop.current;
      const link = nav?.querySelector<HTMLElement>(`a[href="#${active}"]`);
      if (!nav || !link) { setIndicator(previous => ({ ...previous, visible: false })); return; }
      setIndicator({ x: link.offsetLeft, width: link.offsetWidth, visible: true });
    };
    update();
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(update) : undefined;
    if (desktop.current) observer?.observe(desktop.current);
    return () => observer?.disconnect();
  }, [active]);

  useEffect(() => {
    if (!mounted) return;
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) close(panel.current?.contains(document.activeElement) ?? false);
    };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(true); }
    };
    const focusOutside = (event: FocusEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) close();
    };
    const resize = () => { if (innerWidth > 980) close(); };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    document.addEventListener('focusin', focusOutside);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('focusin', focusOutside);
      window.removeEventListener('resize', resize);
    };
  }, [mounted, close]);
  useEffect(() => () => { clearTimeout(timer.current); frames.current.forEach(cancelAnimationFrame); }, []);

  const select = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    close();
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    // Native anchors retain their hash/history/scroll behavior; focus follows the destination.
    requestAnimationFrame(() => target?.focus({ preventScroll: true }));
  };
  const keys = (event: KeyboardEvent<HTMLElement>) => {
    const items = [...(panel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])];
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next = event.key === 'ArrowDown' ? (index + 1) % items.length : event.key === 'ArrowUp' ? (index - 1 + items.length) % items.length : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : -1;
    if (next >= 0) { event.preventDefault(); items[next]?.focus(); }
  };

  return <>
    <nav ref={desktop} className="desktop-nav" aria-label="Main navigation">
      {links.map(([id,label]) => <a className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} key={id} href={`#${id}`} onClick={select}>{label}</a>)}
      <span className="nav-indicator" aria-hidden="true" style={{ transform: `translateX(${indicator.x}px) scaleX(${indicator.width})`, opacity: indicator.visible ? 1 : 0 }}/>
    </nav>
    <a className="button header-register" href={registerHref} target="_blank" rel="noopener noreferrer">{completed ? 'Brochure' : 'Register now'}</a>
    <button ref={button} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" data-open={open} onClick={() => desiredOpen.current ? close(true) : show()} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); show(true); } }}>
      <MoreHorizontal className="menu-dots" aria-hidden="true"/><X className="menu-close" aria-hidden="true"/>
    </button>
    <nav ref={panel} id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!mounted} inert={!open} aria-hidden={!open} data-open={open} onKeyDown={keys}>
      {mobileLinks.map(([id,label],index) => <a key={id} href={`#${id}`} style={{ '--item-index': index } as CSSProperties} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} onClick={select}>{label}</a>)}
    </nav>
  </>;
}
