export interface VideoSession {
  id: number;
  day: number;
  title: string;
  releaseDate: string;      // e.g., '15 Sep 2026'
  unlockTimeISO: string;    // ISO timestamp for 5:30 PM IST (UTC+05:30)
  youtubeUrl: string;
  videoId: string;
  topic: string;
}

export const COURSE_SCHEDULE: VideoSession[] = [
  {
    id: 1,
    day: 1,
    title: 'Lecture 1: Python Orientation & Core Fundamentals',
    releaseDate: '15 September 2026',
    unlockTimeISO: '2026-09-15T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/6_-ZRi-n4YQ?si=XiTirBT0X2yRkJhI',
    videoId: '6_-ZRi-n4YQ',
    topic: 'Introduction to Python runtime, variables, and data types.'
  },
  {
    id: 2,
    day: 2,
    title: 'Lecture 2: Control Flow & Logic Building',
    releaseDate: '16 September 2026',
    unlockTimeISO: '2026-09-16T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/o-Itc8YlnGk?si=b3fDSj0lNc73ypKy',
    videoId: 'o-Itc8YlnGk',
    topic: 'Conditional statements (if-elif-else) and conditional branching.'
  },
  {
    id: 3,
    day: 3,
    title: 'Lecture 3: Loops & Iterations in Python',
    releaseDate: '17 September 2026',
    unlockTimeISO: '2026-09-17T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/o-nJlbJUaUw?si=cwdFaS75l9j_2C-e',
    videoId: 'o-nJlbJUaUw',
    topic: 'While loops, For loops, break, continue, and pass statements.'
  },
  {
    id: 4,
    day: 4,
    title: 'Lecture 4: Custom Functions & Scope Management',
    releaseDate: '18 September 2026',
    unlockTimeISO: '2026-09-18T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/IPHLmVgyA1Y?si=3HDxvih_ZXhlMvup',
    videoId: 'IPHLmVgyA1Y',
    topic: 'Function arguments, return types, lambda functions, and namespaces.'
  },
  {
    id: 5,
    day: 5,
    title: 'Lecture 5: In-Depth Data Structures (Lists, Tuples, Sets)',
    releaseDate: '19 September 2026',
    unlockTimeISO: '2026-09-19T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/8YHy_lRxWOg?si=KYGqtXsJSKrfvomr',
    videoId: '8YHy_lRxWOg',
    topic: 'Sequence manipulation, list comprehensions, and set operations.'
  },
  {
    id: 6,
    day: 6,
    title: 'Lecture 6: Dictionaries & Key-Value Processing',
    releaseDate: '21 September 2026',
    unlockTimeISO: '2026-09-21T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/X4r8nJXwMu4?si=Zc8DtBPXqRPPFVvu',
    videoId: 'X4r8nJXwMu4',
    topic: 'Hash maps in Python, nested dicts, and JSON integration.'
  },
  {
    id: 7,
    day: 7,
    title: 'Lecture 7: Object-Oriented Programming (OOP) Essentials',
    releaseDate: '22 September 2026',
    unlockTimeISO: '2026-09-22T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/u-MHuQ-oFv0?si=znsSFzMsCP-o_Ale',
    videoId: 'u-MHuQ-oFv0',
    topic: 'Classes, Objects, __init__ constructor, and class attributes.'
  },
  {
    id: 8,
    day: 8,
    title: 'Lecture 8: Advanced OOP - Inheritance & Polymorphism',
    releaseDate: '23 September 2026',
    unlockTimeISO: '2026-09-23T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/VEPzjtQn6po?si=ww0rk9dy_tiBPlFj',
    videoId: 'VEPzjtQn6po',
    topic: 'Super(), multiple inheritance, method resolution order (MRO).'
  },
  {
    id: 9,
    day: 9,
    title: 'Lecture 9: File Handling & Exception Management',
    releaseDate: '24 September 2026',
    unlockTimeISO: '2026-09-24T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/BaStXOCjYBw?si=vGkwgDf00qaBzRS8',
    videoId: 'BaStXOCjYBw',
    topic: 'Reading/writing files, context managers (with), and try-except-finally blocks.'
  },
  {
    id: 10,
    day: 10,
    title: 'Lecture 10: Modules, PIP Ecosystem & REST APIs',
    releaseDate: '25 September 2026',
    unlockTimeISO: '2026-09-25T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/G7dxGZibsbg?si=MwrAn8uUYjcDIIN1',
    videoId: 'G7dxGZibsbg',
    topic: 'Custom modules, virtual environments, pip, and HTTP requests API.'
  },
  {
    id: 11,
    day: 11,
    title: 'Lecture 11: Real-World Project & Internship Kickoff',
    releaseDate: '26 September 2026',
    unlockTimeISO: '2026-09-26T17:30:00+05:30',
    youtubeUrl: 'https://www.youtube.com/live/5e1e2o1y0YU?si=YMxUiOrZ2LC0Cbih',
    videoId: '5e1e2o1y0YU',
    topic: 'Building an end-to-end backend application and assignment allocation.'
  }
];