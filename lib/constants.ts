export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

// Realistic upcoming or popular developer events. Images reference files in public/images
export const events: EventItem[] = [
  {
    title: 'Next.js Conf 2026',
    image: '/images/event1.png',
    slug: 'nextjs-conf-2026',
    location: 'San Francisco, CA',
    date: 'March 10-12, 2026',
    time: '09:00 - 18:00',
  },
  {
    title: 'React Summit',
    image: '/images/event2.png',
    slug: 'react-summit-2026',
    location: 'Amsterdam, Netherlands',
    date: 'April 20-21, 2026',
    time: '10:00 - 17:30',
  },
  {
    title: 'JSWorld Conference',
    image: '/images/event3.png',
    slug: 'jsworld-2026',
    location: 'Online / Global',
    date: 'May 5-7, 2026',
    time: '09:00 - 19:00 (UTC)',
  },
  {
    title: 'NodeConf EU',
    image: '/images/event4.png',
    slug: 'nodeconf-eu-2026',
    location: 'Lisbon, Portugal',
    date: 'June 15-17, 2026',
    time: '09:30 - 18:00',
  },
  {
    title: 'Hack the North (Hackathon)',
    image: '/images/event5.png',
    slug: 'hack-the-north-2026',
    location: 'Waterloo, ON, Canada',
    date: 'September 18-20, 2026',
    time: '24h hackathon',
  },
  {
    title: 'ETHGlobal Hackathon',
    image: '/images/event6.png',
    slug: 'ethglobal-2026',
    location: 'Berlin, Germany',
    date: 'July 22-24, 2026',
    time: '10:00 - 20:00',
  },
  {
    title: 'Google I/O',
    image: '/images/event-full.png',
    slug: 'google-io-2026',
    location: 'Mountain View, CA',
    date: 'May 12-14, 2026',
    time: '09:00 - 18:00',
  },
];
