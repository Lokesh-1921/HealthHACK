export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'Keynotes' | 'Collaboration' | 'Prototyping' | 'Mentorship' | 'Awards';
  year: '2026' | '2025';
  isVideo?: boolean;
  videoSrc?: string;
  poster?: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'IMG_2056',
    src: '/lottie/IMG_2056.webp',
    title: 'Inaugural Session & Keynote',
    caption:
      'University dignitaries and keynote speakers inaugurating Health Hackathon with global health directives.',
    category: 'Keynotes',
    year: '2026',
  },
  {
    id: 'IMG_2091',
    src: '/lottie/IMG_2091.webp',
    title: 'Cross-Disciplinary Team Ideation',
    caption:
      'Engineers, data scientists, and healthcare innovators uniting to tackle resource-limited healthcare gaps.',
    category: 'Collaboration',
    year: '2026',
  },
  {
    id: 'IMG_3176',
    src: '/lottie/IMG_3176.webp',
    title: 'Hardware & Sensor Prototyping',
    caption:
      'Student teams integrating biometric sensors and edge computing devices for rural clinic diagnostics.',
    category: 'Prototyping',
    year: '2026',
  },
  {
    id: 'IMG_3228',
    src: '/lottie/IMG_3228.webp',
    title: 'Clinical & Technical Mentorship',
    caption:
      'Industry experts and medical researchers guiding teams on clinical feasibility and regulatory pathways.',
    category: 'Mentorship',
    year: '2026',
  },
  {
    id: 'IMG_3300',
    src: '/lottie/IMG_3300.webp',
    title: 'Midnight Hackathon Sprint',
    caption:
      'The energy remains high as teams build through the night to refine their AI models and physical prototypes.',
    category: 'Collaboration',
    year: '2026',
  },
  {
    id: 'IMG_3352',
    src: '/lottie/IMG_3352.webp',
    title: 'Jury Evaluation & Architecture Review',
    caption:
      'Distinguished faculty reviewing student codebases, system diagrams, and algorithmic accuracy.',
    category: 'Mentorship',
    year: '2026',
  },
  {
    id: 'IMG_3395',
    src: '/lottie/IMG_3395.webp',
    title: 'Digital Health Platform Demo',
    caption:
      'Live test runs of telehealth dashboards designed for low-bandwidth rural health centers.',
    category: 'Prototyping',
    year: '2026',
  },
  {
    id: 'IMG_3448',
    src: '/lottie/IMG_3448.webp',
    title: 'Grand Plenary Hall',
    caption:
      'Auditorium filled with eager participants, researchers, and mentors during the plenary address.',
    category: 'Keynotes',
    year: '2026',
  },
  {
    id: 'IMG_3546',
    src: '/lottie/IMG_3546.webp',
    title: 'Final Stage Pitch Presentations',
    caption:
      'Shortlisted finalists pitching their transformative healthtech solutions before the grand jury.',
    category: 'Prototyping',
    year: '2026',
  },
  {
    id: 'IMG_3592',
    src: '/lottie/IMG_3592.webp',
    title: 'Deep-Dive Clinical Feedback',
    caption:
      'One-on-one session with clinicians discussing usability and patient safety protocols.',
    category: 'Mentorship',
    year: '2026',
  },
  {
    id: 'IMG_3618',
    src: '/lottie/IMG_3618.webp',
    title: 'Collaborative Workspace Dynamics',
    caption:
      'Teams exchanging ideas across problem tracks to craft holistic community healthcare models.',
    category: 'Collaboration',
    year: '2026',
  },
  {
    id: 'IMG_3621',
    src: '/lottie/IMG_3621.webp',
    title: 'Hands-on Device Calibration',
    caption:
      'Validating low-cost point-of-care testing devices for maternal and neonatal health screening.',
    category: 'Prototyping',
    year: '2026',
  },
  {
    id: 'IMG_3643',
    src: '/lottie/IMG_3643.webp',
    title: 'Design Thinking & UX Workshop',
    caption:
      'Interactive workshop on human-centered design for elderly patients and rural healthcare workers.',
    category: 'Mentorship',
    year: '2026',
  },
  {
    id: 'IMG_3689',
    src: '/lottie/IMG_3689.webp',
    title: 'Institutional Leadership Address',
    caption: 'Leadership from VIT Bhopal and Johns Hopkins Whiting School addressing the assembly.',
    category: 'Keynotes',
    year: '2026',
  },
  {
    id: 'IMG_3699',
    src: '/lottie/IMG_3699.webp',
    title: 'Global Community at Work',
    caption: 'Bright minds from across institutions coming together with one shared mission.',
    category: 'Collaboration',
    year: '2026',
  },
  {
    id: 'IMG_3722',
    src: '/lottie/IMG_3722.webp',
    title: 'Interactive Technical Masterclass',
    caption:
      'Delegates and students engaging during specialized AI diagnostics and bioethics sessions.',
    category: 'Keynotes',
    year: '2026',
  },
  {
    id: 'IMG_3768',
    src: '/lottie/IMG_3768.webp',
    title: 'Valedictory & Prize Distribution',
    caption:
      'Celebrating top innovations recognized for practical impact, scalability, and technical excellence.',
    category: 'Awards',
    year: '2026',
  },
  {
    id: 'IMG_3779',
    src: '/lottie/IMG_3779.webp',
    title: 'Winning Team Felicitations',
    caption:
      'Awardees receiving certificates and laurels for their groundbreaking healthcare access solution.',
    category: 'Awards',
    year: '2026',
  },
  {
    id: 'IMG_3810',
    src: '/lottie/IMG_3810.webp',
    title: 'Health Hackathon Community Finale',
    caption:
      'Organizers, mentors, delegates, and student innovators marking the conclusion of an inspiring edition.',
    category: 'Awards',
    year: '2026',
  },
  // 2025 Edition Photos
  {
    id: '2025-1',
    src: '/2025-1.png',
    title: 'Health Hack 2025 Inaugural Delegation',
    caption:
      'Dignitaries, faculty, and academic leadership inaugurating the 2025 Health Hackathon.',
    category: 'Keynotes',
    year: '2025',
  },
  {
    id: '2025-2',
    src: '/2025-2.png',
    title: 'Auditorium Inaugural Address 2025',
    caption:
      'Welcoming innovators and delegates to the global health access challenge at the auditorium.',
    category: 'Keynotes',
    year: '2025',
  },
  {
    id: '2025-3',
    src: '/2025-3.png',
    title: 'Active Hackathon Hall 2025',
    caption:
      'Innovators collaborating and building working healthcare solutions during the 2025 sprint.',
    category: 'Collaboration',
    year: '2025',
  },
  {
    id: '2025-4',
    src: '/2025-4.png',
    title: 'Collaborative Problem Solving 2025',
    caption:
      'Student teams analyzing health accessibility challenges and coding solutions together.',
    category: 'Collaboration',
    year: '2025',
  },
  {
    id: '2025-5',
    src: '/2025-5.png',
    title: 'Device & Hardware Prototyping 2025',
    caption: 'Hands-on assembly of portable healthtech hardware components and sensor kits.',
    category: 'Prototyping',
    year: '2025',
  },
  {
    id: '2025-6',
    src: '/2025-6.png',
    title: 'Expert Mentorship & Guidance 2025',
    caption:
      'Mentors discussing project architecture, clinical relevance, and feasibility with teams.',
    category: 'Mentorship',
    year: '2025',
  },
  {
    id: '2025-7',
    src: '/2025-7.png',
    title: 'Technical Evaluation & Feedback 2025',
    caption:
      'Evaluators and mentors reviewing prototypes and providing actionable technical guidance.',
    category: 'Mentorship',
    year: '2025',
  },
  {
    id: '2025-8',
    src: '/2025-8.png',
    title: 'Interactive Project Demonstration 2025',
    caption:
      'Innovators presenting their functional healthtech prototypes to judges and peer teams.',
    category: 'Prototyping',
    year: '2025',
  },
  {
    id: '2025-9',
    src: '/2025-9.png',
    title: 'Health Hack 2025 Valedictory Ceremony',
    caption:
      'Celebrating participant achievements, team awards, and shared milestones at the closing session.',
    category: 'Awards',
    year: '2025',
  },
];

export const galleryYears = ['2026', '2025'] as const;
export type GalleryYear = (typeof galleryYears)[number];

export const galleryCategories = [
  'All',
  'Keynotes',
  'Collaboration',
  'Prototyping',
  'Mentorship',
  'Awards',
] as const;
