import { format } from 'date-fns/format';

export type ExperienceItem = {
  employer: string;
  position: string;
  website?: string;
  summary: string;
  startDate: string;
  endDate?: string;
  keyAchievements?: { label?: string; description: string }[];
};

export const KomoExperience: ExperienceItem = {
  employer: 'Komo Technologies',
  position: 'Lead Developer',
  website: 'https://komo.tech',
  startDate: '2021-02-01',
  summary:
    'Komo is a gamified marketing SaaS that generates leads and engages audiences through digital experiences. I lead a team of five developers.',
  keyAchievements: [
    {
      label: 'Architected and modernized the platform',
      description:
        'Led multiple large-scale refactors including migration to Turborepo, reducing main app bundle size by 40%, introducing shared libraries/config, and replacing a legacy component library with Mantine for faster development and light/dark mode support.',
    },
    {
      label: 'Modernized API architecture',
      description:
        'Transitioned from N-tier to Onion + Mediator pattern, standardizing authorization pipelines, implementing the outbox pattern for reliable event persistence, and reducing unused code.',
    },
    {
      label: 'Scaled analytics and workflows',
      description:
        'Evolved analytics into an event store model with database projections and transient event subscribers; built a Zapier-like workflow system powered by these events, including a drag-and-drop front-end workflow builder and back-end processing engine leveraging the event store for reliable, real-time execution.',
    },
    {
      label: 'Accelerated delivery and reduced costs',
      description:
        'Implemented conditional GitHub Actions builds, database CI/CD testing workflows, and Next.js App Router with Turbopack for faster deployments.',
    },
    {
      label: 'Developed AI content generation system',
      description:
        'Developed a multi-agent orchestrated AI chatbot that generated interactive game/content experiences, built necessary data schemas, adapted to brand colors/data, and offered real-time insights and recommendations.',
    },
    {
      label: 'Launched the Data Feeds product',
      description:
        'Conceived and delivered the Data Feeds product, enabling multi-page, screen-size–specific layouts with text, images, videos, and live data blocks such as Q&A feeds, leaderboards, and poll results. This innovation elevated live events and secured new business opportunities.',
    },
    {
      label: 'Built new customer integration paths',
      description:
        'Developed an embeddable SDK for integrating platform content into customer sites with a single script.',
    },
    {
      label: 'Optimized performance at scale',
      description:
        'Introduced distributed caching (Redis) and in-memory caching to drastically reduce API latency for high-traffic endpoints.',
    },
    {
      label: 'Enhanced observability and quality',
      description:
        'Rolled out OpenTelemetry tracing, refactored database migration rules, and created XUnit integration testing scaffolding to increase coverage and developer focus on business rules.',
    },
    {
      label: 'Led hiring and team growth',
      description:
        'Managed recruitment end-to-end, onboarded new developers, fostered autonomy, and aligned work with team members’ interests.',
    },
    {
      label: 'Improved cross-team collaboration',
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
    "I Contributed to BHP's Dash project, which equips fitters with devices containing installation instructions and integrated sensors, transmitting data to a web platform accessible via device Wi-Fi.",
  keyAchievements: [
    {
      label: 'Optimized sensor data processing pipeline',
      description:
        'Enhanced .NET Core container performance for parsing high-volume raw sensor data into an Influx database, improving reliability and efficiency.',
    },
    {
      label: 'Enhanced real-time equipment dashboards',
      description:
        'Created user-friendly gauges and graph controls for a React SPA, improving live data visualization and user experience for field technicians.',
    },
    {
      label: 'Led knowledge sharing and standards adoption',
      description:
        'Mentored team members on .NET best practices and React fundamentals, promoting consistent coding standards and accelerating onboarding.',
    },
    {
      label: 'Streamlined deployment with CI/CD automation',
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
    'I Worked as a full-stack developer in the Personal Finance team, responsible for the loan application process and supporting services.',
  keyAchievements: [
    {
      label: 'Built event-driven messaging infrastructure',
      description:
        'Designed and implemented a CQRS-based event-driven messaging infrastructure using Rebus, enabling reliable inter-service communication and improving scalability across the platform.',
    },
    {
      label: 'Refactored and stabilized core loan application platform',
      description:
        'Led a complete overhaul of the main loan web application, migrating from JavaScript to TypeScript, simplifying complex code, and writing comprehensive documentation. Transformed the application from a high-maintenance, error-prone system into a stable, maintainable platform.',
    },
    {
      label: 'Strengthened quality assurance and release confidence',
      description:
        'Achieved full test coverage for the loan application using Cypress, integrated into the CI/CD pipeline to ensure consistent quality and reduce production issues.',
    },
    {
      label: 'Mentored and upskilled junior developers',
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
  keyAchievements: [
    {
      label: 'Pioneered TypeScript adoption in React projects',
      description:
        'Advocated for and demonstrated TypeScript integration in React applications through examples and technical discussions with principal engineers, leading to its adoption across projects for improved type safety and maintainability.',
    },
    {
      label: 'Improved CQRS authorization pattern',
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
    'Diversus provides software solutions as a service to several organisations mostly in the C# .Net space. I worked as a full stack developer creating solutions for the front and back end of bespoke web applications.',
};

const ClickhomeExperience: ExperienceItem = {
  employer: 'Clickhome',
  position: 'Full Stack Developer',
  website: 'https://www.clickhome.com.au',
  startDate: '2016-09-01',
  endDate: '2018-08-01',
  summary:
    'ClickHome provides enterprise level project management software for home builders. I worked as a full stack developer using C# .Net and AngularJS to build new features to their core application.',
};

export const AllExperience: ExperienceItem[] = [
  KomoExperience,
  Bhp1Experience,
  CashConvertersExperience,
  Bhp2Experience,
  DiversusExperience,
  ClickhomeExperience,
];

export const getExperienceDateDisplay = ({
  startDate,
  endDate,
}: Pick<ExperienceItem, 'startDate' | 'endDate'>) => {
  const parts: string[] = [format(startDate, 'MMM yyyy')];
  if (endDate) {
    parts.push(format(endDate, 'MMM yyyy'));
  } else {
    parts.push('Present');
  }

  return parts.join(' - ');
};
