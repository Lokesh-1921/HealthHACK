/** Shared destinations, in the existing mobile menu's published order. */
export const navigationLinks = [
  ['overview', 'Overview'],
  ['tracks', 'Focus areas'],
  ['timeline', 'Timeline'],
  ['awards', 'Awards'],
  ['committee', 'People'],
  ['registration', 'Registration'],
  ['contact', 'Contact'],
] as const;

export type NavigationLink = typeof navigationLinks[number];
