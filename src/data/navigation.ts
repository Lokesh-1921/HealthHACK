/** Shared destinations, in the existing mobile menu's published order. */
export const navigationLinks = [
  ['overview', 'Overview'],
  ['tracks', 'Focus areas'],
  ['timeline', 'Timeline'],
  ['awards', 'Awards'],
  ['committee', 'People'],
  ['registration', 'Registration'],
  ['institutions', 'Institutions'],
  ['participation', 'Participation'],
  ['coordinator', 'Coordinator'],
  ['contact', 'Contact'],
] as const;

export type NavigationLink = typeof navigationLinks[number];
