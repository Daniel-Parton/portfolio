export type ExperienceItem = {
  employer: string;
  position: string;
  website?: string;
  summary: string;
  startDate: string;
  endDate?: string;
  technologies?: string[];
  keyAchievements?: { label?: string; description: string }[];
};

export const ResumeSkillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Mantine', 'Nextra', 'HTML5', 'CSS'],
  },
  {
    label: 'Backend',
    skills: ['.NET', 'C#', 'Node.js', 'PostgreSQL', 'Redis', 'OpenAPI', 'ReactiveX'],
  },
  {
    label: 'Infrastructure',
    skills: [
      'AWS',
      'Azure',
      'GCP',
      'Docker',
      'Terraform',
      'GitHub Actions',
      'Octopus Deploy',
      'OpenTelemetry',
      'GitHub Copilot',
    ],
  },
] as const;

export type ResumeSkill = (typeof ResumeSkillGroups)[number]['skills'][number];

export type ResumeProfile = {
  name: string;
  headline: string;
  summary: string;
  highlights: string[];
  skillGroups: typeof ResumeSkillGroups;
};

export type ResumeContact = {
  phone: string;
  email: string;
  website: string;
};

export const ResumeContactData: ResumeContact = {
  phone: '+61 432 520 907',
  email: 'daniel.parton@hotmail.com',
  website: 'https://daniel-parton.github.io/portfolio',
};

export const ResumeProfileData: ResumeProfile = {
  name: 'Daniel Parton',
  headline: 'Senior Full-Stack Engineering Lead',
  summary:
    'Senior full-stack engineering leader with 10+ years of experience designing and delivering cloud-native enterprise applications, distributed .NET services, React platforms, and AI-assisted engineering workflows. I paired hands-on implementation with technical leadership to modernize complex systems, improve delivery practices, and build secure, scalable software across AWS, Azure, and GCP.',
  highlights: [
    'Technical leadership across architecture, implementation, mentoring, and delivery.',
    'Distributed .NET microservices, event-driven processing, real-time synchronization, and cloud-native application modernization.',
    'React and TypeScript platform delivery, including shared component libraries and design-system adoption.',
    'AI-assisted development workflows, multi-agent systems, LLM-ready documentation, and developer productivity tooling.',
    'Technical discovery, stakeholder advisory, CI/CD, infrastructure automation, observability, testing, and production-quality delivery practices.',
  ],
  skillGroups: ResumeSkillGroups,
};

export const HaulXExperience: ExperienceItem = {
  employer: 'Fortescue',
  position: 'Software Squad Lead (HaulX)',
  startDate: '2025-09-01',
  summary:
    'HaulX is an enterprise fleet platform for manned and autonomous mining operations. In this role, I led AWS-hosted Offboard .NET microservices, autonomous asset control services, telemetry workflows, and React applications for controllers and operators while staying hands-on across architecture, modernization, and delivery.',
  technologies: [
    'AWS',
    '.NET',
    'C#',
    'React',
    'TypeScript',
    'Rx.NET',
    'Event-Driven Architecture',
    'Microservices',
    'Base UI',
    'Fumadocs',
    'npm',
    'Docker Swarm',
    'Octopus Deploy',
    'Azure DevOps',
  ],
  keyAchievements: [
    {
      label: 'Autonomous platform delivery',
      description:
        'Led the design and delivery of backend services and platform capabilities for autonomous mining operations across Offboard systems and onboard computers.',
    },
    {
      label: 'Autonomous asset synchronization service',
      description:
        'Modernized a core service that synchronized live tasks, permissions, commands, and operational state between Offboard systems and autonomous assets.',
    },
    {
      label: 'Partitioned event processing',
      description:
        'Designed partitioned command and event queues for internal event-driven processing, increasing throughput while preserving ordering guarantees for asset-specific workloads.',
    },
    {
      label: 'Reactive state synchronization',
      description:
        'Applied Rx observables over in-memory stores to improve synchronization of active tasks, permissions, and live asset state for downstream services.',
    },
    {
      label: 'Shared React UI library',
      description:
        'Partnered with UI/UX to replace legacy HaulX UI with a Figma-aligned React library, npm packages, live documentation, and LLM-ready coding-agent migration guidance.',
    },
    {
      label: 'Architecture, discovery, and hiring',
      description:
        'Drove architecture for large HaulX features, translated discovery into delivery-ready tickets, ran client stakeholder closeouts, and interviewed architect and developer candidates.',
    },
  ],
};

export const KomoExperience: ExperienceItem = {
  employer: 'Komo Technologies',
  position: 'Lead Developer',
  website: 'https://komo.tech',
  startDate: '2021-02-01',
  endDate: '2025-09-01',
  summary:
    'Komo is a gamified marketing SaaS platform for lead generation and audience engagement. I provided technical leadership for a five-person engineering team while remaining hands-on across architecture, implementation, mentoring, and delivery.',
  technologies: [
    '.NET',
    'React',
    'TypeScript',
    'Next.js',
    'PostgreSQL',
    'Redis',
    'OpenTelemetry',
    'GitHub Actions',
    'Docker',
    'AI Agents',
  ],
  keyAchievements: [
    {
      label: 'Platform architecture and modernization',
      description:
        'Led multiple large-scale refactors including migration to Turborepo, reducing main app bundle size by 40%, introducing shared libraries/config, and replacing a legacy component library with Mantine for faster development and light/dark mode support.',
    },
    {
      label: 'API architecture modernization',
      description:
        'Transitioned from N-tier to Onion + Mediator pattern, standardizing authorization pipelines, implementing the outbox pattern for reliable event persistence, and reducing unused code.',
    },
    {
      label: 'Analytics and workflow scalability',
      description:
        'Evolved analytics into an event store model with database projections and transient event subscribers; built a Zapier-like workflow system powered by these events, including a drag-and-drop front-end workflow builder and back-end processing engine leveraging the event store for reliable, real-time execution.',
    },
    {
      label: 'Delivery acceleration and cost reduction',
      description:
        'Implemented conditional GitHub Actions builds, database CI/CD testing workflows, and Next.js App Router with Turbopack for faster deployments.',
    },
    {
      label: 'AI content generation system',
      description:
        'Developed a multi-agent AI content generation system that produced interactive campaign experiences, adapted outputs to customer brand data, and provided real-time insights and recommendations.',
    },
    {
      label: 'Data Feeds product launch',
      description:
        'Conceived and delivered the Data Feeds product, enabling multi-page, screen-size-specific layouts with text, images, videos, and live data blocks such as Q&A feeds, leaderboards, and poll results. The product elevated live-event experiences and helped secure new business opportunities.',
    },
    {
      label: 'Customer integration paths',
      description:
        'Developed an embeddable SDK for integrating platform content into customer sites with a single script.',
    },
    {
      label: 'Performance optimization at scale',
      description:
        'Introduced distributed caching (Redis) and in-memory caching to drastically reduce API latency for high-traffic endpoints.',
    },
    {
      label: 'Observability and quality',
      description:
        'Rolled out OpenTelemetry tracing, refactored database migration rules, and created XUnit integration testing scaffolding to increase coverage and developer focus on business rules.',
    },
    {
      label: 'Hiring and team growth',
      description:
        'Managed recruitment end-to-end, onboarded new developers, fostered autonomy, and aligned work with team members’ interests.',
    },
    {
      label: 'Cross-team collaboration',
      description:
        'Worked with product, marketing, and CS to prioritize BAU feature requests, enabling faster delivery of small wins and better tracking of recurring big-ticket items.',
    },
  ],
};

const Bhp1Experience: ExperienceItem = {
  employer: 'BHP',
  position: 'Senior Full Stack Developer',
  website: 'https://www.bhp.com',
  startDate: '2020-10-01',
  endDate: '2021-02-01',
  summary:
    "Contributed to BHP's Dash project, a field-device platform that provided fitters with installation instructions, captured integrated sensor data, and synchronized results to a web platform over device Wi-Fi.",
  technologies: ['.NET Core', 'C#', 'React', 'Docker', 'Azure DevOps', 'InfluxDB'],
  keyAchievements: [
    {
      label: 'Sensor data processing pipeline',
      description:
        'Enhanced .NET Core container performance for parsing high-volume raw sensor data into an Influx database, improving reliability and efficiency.',
    },
    {
      label: 'Real-time equipment dashboards',
      description:
        'Created user-friendly gauges and graph controls for a React SPA, improving live data visualization and user experience for field technicians.',
    },
    {
      label: 'Knowledge sharing and standards adoption',
      description:
        'Mentored team members on .NET best practices and React fundamentals, promoting consistent coding standards and accelerating onboarding.',
    },
    {
      label: 'CI/CD deployment automation',
      description:
        'Automated Docker container deployment using Azure DevOps, improving delivery speed, reducing manual effort, and ensuring consistent releases.',
    },
  ],
};

const CashConvertersExperience: ExperienceItem = {
  employer: 'Cash Converters',
  position: 'Senior Full Stack Developer',
  website: 'https://www.cashconverters.com.au',
  startDate: '2019-07-01',
  endDate: '2020-10-01',
  summary:
    'Worked as a full-stack developer in the Personal Finance team, responsible for the loan application process and supporting services.',
  technologies: ['.NET', 'C#', 'TypeScript', 'CQRS', 'Rebus', 'Cypress', 'CI/CD'],
  keyAchievements: [
    {
      label: 'Event-driven messaging infrastructure',
      description:
        'Designed and implemented a CQRS-based event-driven messaging infrastructure using Rebus, enabling reliable inter-service communication and improving scalability across the platform.',
    },
    {
      label: 'Core loan application platform stabilization',
      description:
        'Led a complete overhaul of the main loan web application, migrating from JavaScript to TypeScript, simplifying complex code, and writing comprehensive documentation. Transformed the application from a high-maintenance, error-prone system into a stable, maintainable platform.',
    },
    {
      label: 'Quality assurance and release confidence',
      description:
        'Achieved full test coverage for the loan application using Cypress, integrated into the CI/CD pipeline to ensure consistent quality and reduce production issues.',
    },
    {
      label: 'Junior developer mentoring',
      description:
        'Provided guidance on development best practices, fostering skill growth, ownership, and confidence within the team.',
    },
  ],
};

const Bhp2Experience: ExperienceItem = {
  employer: 'BHP',
  position: 'Senior Full Stack Developer',
  website: 'https://www.bhp.com',
  startDate: '2019-04-01',
  endDate: '2019-07-01',
  summary:
    'During my short contract role, I led the rewriting of small applications from .NET/AngularJS to React/.NET Core, with a focus on mobilization and resource allocation for mine shutdowns.',
  technologies: ['.NET Core', 'C#', 'React', 'TypeScript', 'CQRS', 'Mediator'],
  keyAchievements: [
    {
      label: 'TypeScript adoption in React projects',
      description:
        'Advocated for and demonstrated TypeScript integration in React applications through examples and technical discussions with principal engineers, leading to its adoption across projects for improved type safety and maintainability.',
    },
    {
      label: 'CQRS authorization pattern',
      description:
        'Introduced a pattern within the CQRS Mediator to handle authorization via attributes, replacing API-layer checks. This made it easier to test, extend, and run additional validations within mediator actions.',
    },
  ],
};

const DiversusExperience: ExperienceItem = {
  employer: 'Diversus',
  position: 'Senior Full Stack Developer',
  website: 'https://www.diversus.com.au',
  startDate: '2018-08-01',
  endDate: '2019-04-01',
  summary:
    'Worked as a full-stack developer at Diversus, delivering front-end and back-end features for bespoke C# .NET web applications across multiple client organizations.',
  technologies: ['C#', '.NET', 'JavaScript', 'SQL'],
};

const ClickhomeExperience: ExperienceItem = {
  employer: 'Clickhome',
  position: 'Full Stack Developer',
  website: 'https://www.clickhome.com.au',
  startDate: '2016-09-01',
  endDate: '2018-08-01',
  summary:
    'Worked as a full-stack developer at ClickHome, building C# .NET and AngularJS features for enterprise project management software used by home builders.',
  technologies: ['C#', '.NET', 'AngularJS', 'JavaScript', 'SQL'],
};

export const AllExperience: ExperienceItem[] = [
  HaulXExperience,
  KomoExperience,
  Bhp1Experience,
  CashConvertersExperience,
  Bhp2Experience,
  DiversusExperience,
  ClickhomeExperience,
];

export const ResumeData = {
  profile: ResumeProfileData,
  contact: ResumeContactData,
  experience: AllExperience,
};
