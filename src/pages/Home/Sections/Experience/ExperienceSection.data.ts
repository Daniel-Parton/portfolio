import { format } from 'date-fns/format';

export type ExperienceItem = {
  employer: string;
  position: string;
  website?: string;
  summary: string;
  startDate: string;
  endDate?: string;
  keyAchievements?: string[];
};

export const KomoExperience: ExperienceItem = {
  employer: 'Komo Technologies',
  position: 'Lead Developer',
  website: 'https://komo.tech',
  startDate: '2021-02-01',
  summary:
    'Komo is a gamified marketing SaaS that generates leads and engages audiences through digital experiences. I lead a team of five developers.',
  keyAchievements: [
    'Developed a scalable analytics/workflow stack with event sourcing.',
    'Replaced N-tier architecture with CQRS pattern using Mediatr.',
    'Enhanced CI/CD pipeline with database integration testing for better coverage.',
    'Implemented SignalR for web sockets in complex games.',
    'Created a dynamic data-driven form builder using React Hook Form.',
    'Mentored junior developers, fostering autonomy and responsibility.',
    'Implemented a new support stream by establishing a feature request workflow for internal teams and customers, enabling prioritization of small dev features.',
    'Led the creation of a UI block builder for webpage design and linking live event data.',
  ],
};

const Bhp1Experience: ExperienceItem = {
  employer: 'BHP',
  position: 'Senior Full Stack Developer',
  website: 'https://www.bhp.com',
  startDate: '2020-10-01',
  endDate: '2021-02-01',
  summary:
    "I contributed to BHP's Dash project, which equips fitters with a device that includes installation instructions and sensors, transmitting data to a website accessible through the device's Wi-Fi.",
  keyAchievements: [
    'Optimized .NET Core container for efficient raw sensor data parsing to Influx database.',
    'Created user-friendly gauges and graph controls for a React SPA, improving user experience.',
    'Mentored team on .NET standards and React basics, promoting growth and teamwork.',
    'Automated Docker container deployment using Azure DevOps, enhancing software delivery speed and consistency.',
  ],
};

const CashConvertExperience: ExperienceItem = {
  employer: 'Cash Converters',
  position: 'Senior Full Stack Developer',
  website: 'https://www.cashconverters.com.au',
  startDate: '2019-07-01',
  endDate: '2020-10-01',
  summary:
    "I worked as a full-stack developer in Cash Converters' Personal Finance team, which handles the loan application process",
  keyAchievements: [
    'Developed a Service Bus, integrating Rebus with CQRS for better communication and scalability.',
    'Improved the main loan web application with Typescript and React, enhancing performance and user experience.',
    'Achieved full test coverage for the loan web application using Cypress, integrated with CI/CD for quality control.',
    'Mentored junior developers, helping them gain responsibility and skills for their careers.',
  ],
};

const Bhp2Experience: ExperienceItem = {
  employer: 'BHP',
  position: 'Senior Full Stack Developer',
  website: 'https://www.bhp.com',
  startDate: '2019-04-01',
  endDate: '2019-07-01',
  summary:
    'During my short contract role, I led the rewriting of small applications from .Net/AngularJS to React/.NET Core, with a focus on mobilization and resource allocation for mine shutdowns.',
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
  CashConvertExperience,
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
