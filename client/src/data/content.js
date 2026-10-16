/* =====================================================================
   ALL EDITABLE CONTENT LIVES HERE.
   Anything marked  // EDIT  is a placeholder - replace it with your real info.
   Empty strings ('') for links are shown as disabled "link not added" buttons,
   so the site never links to something that does not exist.
   ===================================================================== */

export const profile = {
  name: 'Lakshya Vashishtha',
  firstName: 'Lakshya',
  lastName: 'Vashishtha',
  roles: ['MERN Stack Developer', 'B.Tech CSE Student', 'Problem Solver'],
  tagline: 'Building digital experiences at the intersection of logic and imagination.',
  location: 'Jaipur, India',
  status: 'B.Tech CSE student',
  university: 'JK Lakshmipat University',
  photo: '/profile.jpg', // EDIT: put your photo at client/public/profile.jpg (falls back to a placeholder)
  github: 'https://github.com/lakshyaHacks', // EDIT: https://github.com/<username>
  linkedin: 'https://www.linkedin.com/in/lakshya072/', // EDIT: https://www.linkedin.com/in/<username>
  email: 'demoniclakshya@gmail.com', // EDIT: shown in the footer if filled
  bio: [
    'I am a Computer Science undergraduate at JK Lakshmipat University who likes turning ideas into working full-stack products with MongoDB, Express, React and Node.js.',
    'Alongside web development, I work on Python-based statistics and optimization research as part of my PS-1 internship, which keeps me honest about measuring things properly.',
  ],
  goals: 'I want to keep growing as a full-stack developer through internships and real projects.', // EDIT
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'achievements', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

/* ---------- Skills ----------
   EDIT: the "level" numbers (0-100) are PLACEHOLDERS. Set each one to what
   you honestly believe, because your professor may ask about them. */
export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    style: 'bars',
    skills: [
      { name: 'React', level: 70 },
      { name: 'JavaScript', level: 70 },
      { name: 'Tailwind CSS', level: 70 },
      { name: 'Redux Toolkit', level: 60 },
      { name: 'React Router', level: 65 },
      { name: 'HTML & CSS', level: 75 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    style: 'rings',
    skills: [
      { name: 'Node.js', level: 65 },
      { name: 'Express.js', level: 65 },
      { name: 'MongoDB', level: 60 },
      { name: 'Mongoose', level: 60 },
      { name: 'REST APIs', level: 65 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    style: 'bars',
    skills: [
      { name: 'Git & GitHub', level: 65 },
      { name: 'Python', level: 70 },
      { name: 'MongoDB Atlas', level: 55 },
      { name: 'Vercel', level: 60 },
    ],
  },
];

export function levelLabel(n) {
  if (n >= 80) return 'Advanced';
  if (n >= 60) return 'Comfortable';
  if (n >= 40) return 'Working knowledge';
  return 'Learning';
}

/* ---------- Projects ----------
   github / live: paste real URLs. Leave '' until they exist.
   preview: which miniature interface to draw (see ProjectPreview.jsx). */
export const projects = [
  {
    slug: 'leetcode-clone',
    title: 'LeetCode Clone',
    kind: 'Coding practice platform',
    summary: 'A MERN coding-practice platform with a custom code executor built on Node.js child processes.',
    description:
      'Practice platform where users read a problem, write code and run it. When the free Judge0 tier became unavailable, I built my own execution layer on Node.js child_process instead of depending on a third-party judge.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: '', // EDIT
    live: '', // EDIT
    preview: 'editor',
    featured: true,
    details: {
      role: 'Solo project: design, frontend, backend and executor.',
      built: [
        'MERN architecture: React client, Express API and MongoDB for problem and submission data.',
        'A code executor that spawns a Node.js child process per submission and captures its output.',
        'Deep navy and electric violet design system for the interface.',
      ],
      challenge:
        'Judge0 was the first plan, but its free tier stopped being available. I tried self-hosting it on Azure, which failed because of sandbox issues, and then on WSL2 with Docker, which hit compatibility problems. Writing a child_process based executor was the fallback that worked.',
      learned: 'Why code execution needs its own service, and what trade-offs sit behind judge systems.',
    },
  },
  {
    slug: 'food-delivery-app',
    title: 'Food Delivery App',
    kind: 'Restaurant discovery frontend',
    summary: 'A Swiggy-style restaurant browsing app built with React 19, Redux Toolkit and Tailwind CSS v4.',
    description:
      'Frontend for browsing restaurants and menus with client-side routing and a Redux cart. Restaurant data comes through an API proxy, and the app is deployed on Netlify.',
    tech: ['React', 'Redux Toolkit', 'React Router', 'Tailwind CSS', 'Parcel'],
    github: '', // EDIT
    live: '', // EDIT: your Netlify URL
    preview: 'food',
    details: {
      role: 'Solo project: UI, state management and deployment.',
      built: [
        'React 19 with Parcel as the bundler, React Router v7 for pages.',
        'Redux Toolkit store for app state such as the cart.',
        'Tailwind CSS v4 styling, deployed on Netlify.',
      ],
      challenge:
        'Two problems took the most time: a misconfigured Redux store, and CORS errors when calling the restaurant API from the browser, which I solved by routing requests through a proxy.',
      learned: 'How CORS actually works, and how to structure Redux slices so the store stays predictable.',
    },
  },
  {
    slug: 'tsp-metaheuristics',
    title: 'Metaheuristics for the Traveling Salesman Problem',
    kind: 'Research, PS-1 internship',
    summary: 'A comparison of discrete metaheuristic algorithms on TSPLIB benchmarks, written up as a conference paper.',
    description:
      'Part of my PS-1 internship under Dr. Ashish Jain. I implemented the Discrete Grey Wolf Optimizer with 2-opt local search in Python and compare it with other discrete metaheuristics on standard TSPLIB instances. The paper is still in preparation.',
    tech: ['Python', 'Metaheuristics', 'TSPLIB'],
    github: '', // EDIT
    preview: 'route',
    details: {
      role: 'Implementation and paper writing, supervised by Dr. Ashish Jain.',
      built: [
        'Python implementation of D-GWO split across data loading, 2-opt and the optimizer.',
        'Benchmarks on ATT48, EIL51, Berlin52, ST70 and EIL76 from TSPLIB.',
        'One combined convergence graph per dataset comparing all algorithms.',
      ],
      challenge:
        'Keeping the paper rigorous: results must come from real runs, and sections must describe challenges in general terms with data as supporting evidence.',
      learned: 'How to compare optimization algorithms fairly and report results honestly.',
    },
  },
];

/* ---------- Education & experience ---------- */
export const timeline = [
  {
    kind: 'experience',
    period: 'In progress',
    title: 'PS-1 Internship (Research)',
    org: 'JK Lakshmipat University',
    text: 'Supervised by Dr. Ashish Jain. Comparing discrete metaheuristics for the Traveling Salesman Problem and writing the results as a conference paper.',
  },
  {
    kind: 'education',
    period: '2024 - Present', // EDIT: confirm your start year
    title: 'B.Tech, Computer Science & Engineering',
    org: 'JK Lakshmipat University, Jaipur',
    text: 'Coursework includes Full Stack Development, Advanced Statistics and Introduction to Data Science.',
  },
  // EDIT: add your Class 12 / Class 10 entries here
  // { kind: 'education', period: '2022 - 2024', title: 'Senior Secondary', org: 'Your school', text: '' },
];

/* ---------- Certificates & achievements ----------
   placeholder: true renders a dashed "add yours" card. Replace with real ones:
   { platform: 'Coursera', title: '...', year: '2026', url: 'https://verified-link', image: '' } */
export const certificates = [
  { placeholder: true, platform: 'Coursera / NPTEL / LinkedIn Learning', title: 'Add your first certificate' },
  { placeholder: true, platform: 'Certificate', title: 'Add another certificate' },
];

export const achievements = [
  {
    title: 'Research paper in preparation',
    text: 'Conference paper comparing four discrete metaheuristics on the Traveling Salesman Problem (PS-1).',
  },
  // EDIT: add hackathons, awards or competitions here
];
