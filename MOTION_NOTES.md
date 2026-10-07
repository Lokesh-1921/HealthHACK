# Motion update

Content data, brochure, assets, branding, and link destinations are unchanged.

The old scroll offset override, broad reveal containers, persistent animation fill transforms, and native instantaneous disclosures prevented consistent visible motion. The update uses CSS for hero and interface motion and a single IntersectionObserver for one-time section/card entrances. No animation dependencies or competing scroll libraries were added.

- Interface motion: 260 ms; section entrances: 520 ms; reveal stagger: 65 ms, capped at 195 ms.
- Native anchors preserve URL fragments/history and smooth scrolling; measured sticky-header height sets scroll margins.
- Navigation stays mounted throughout closing, becomes inert immediately, and supports Escape, outside clicks, focus departure, selection, arrow keys, Home, and End.
- Accordions keep native details/summary semantics and animate measured height, including interrupted toggles.
- Reduced-motion mode disables movement. Reveal elements use visible default styles if observers or Web Animations are unavailable or fail.

## Verification

Inspected the running preview at 320, 360, 768, 1366, and 1920 px. Checked menu opening/closing, rapid repeated toggles, navigation hashes and sticky offsets, keyboard navigation/focus, card hover after entrances, progressive timeline reveals, accordion Enter/Space and rapid reversals, back-to-top, and emulated reduced motion. No horizontal overflow or clipped hero artwork; browser warning/error logs were empty. Production TypeScript/Vite build passes.
