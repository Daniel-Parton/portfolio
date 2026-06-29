import { ReactNode } from 'react';
import { Marquee } from '@gfazioli/mantine-marquee';
import { Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { Highlighter } from '@/components/Highlighter';
import { Section } from '@/components/Section';
import { ResumeProfileData } from '@/data';
import { useMeasure } from '@/utils/useMeasure';
import { getSkillMarqueeItems } from './capabilityMarqueeData';
import classes from './SkillsSection.module.css';

export function SkillsSection() {
  const container = useMeasure();
  const viewportWidth = container.data.bounds.width;

  return (
    <Section justify="center" navData={{ id: 'skills', label: 'Skills' }} title="What I do">
      <Stack gap="xl" w="100%" ref={container.register}>
        <Stack>
          <Text>
            With over{' '}
            <Highlighter delay={500} action="underline">
              10 years of experience
            </Highlighter>{' '}
            delivering enterprise-scale applications, I work across ambiguous requirements,
            architecture trade-offs, implementation, mentoring, and stakeholder communication. I
            stay hands-on while helping teams modernize systems and deliver maintainable software
            into production.
          </Text>
          <Text>
            On the backend, I design scalable APIs, distributed systems, and event-driven services
            using{' '}
            <Highlighter delay={750} action="underline">
              .NET and C#
            </Highlighter>
            , applying patterns like microservices, domain-driven design, event sourcing,
            partitioned processing, distributed caching, and observability to support reliable
            production workloads.
          </Text>
          <Text>
            On the frontend, I build intuitive, dynamic interfaces with{' '}
            <Highlighter delay={1000} action="underline">
              React, TypeScript, JavaScript, HTML, and CSS
            </Highlighter>
            , including customer-facing applications, workflow builders, and shared component
            platforms that align product, engineering, and design teams.
          </Text>
          <Text>
            In the cloud, I have architected solutions across{' '}
            <Highlighter delay={1250} action="underline">
              AWS, Azure, and GCP
            </Highlighter>
            , implementing CI/CD pipelines, infrastructure automation, and containerized deployments
            with Docker and modern DevOps practices.
          </Text>
          <Text>
            I also use AI-assisted tooling where it has a practical job: accelerating
            implementation, code review, documentation, and migration work, including custom coding
            skills for internal engineering teams.
          </Text>
          <Text>
            I'm always eager to learn new things. Here are the technologies I work across:
          </Text>
        </Stack>
        {container.data.hasBounds && (
          <>
            {ResumeProfileData.skillGroups.map((skillGroup) => (
              <ResponsiveMarque
                key={skillGroup.label}
                items={getSkillMarqueeItems(skillGroup.skills)}
                title={skillGroup.label}
                viewPortWidth={viewportWidth}
              />
            ))}
          </>
        )}
      </Stack>
    </Section>
  );
}

type ResponsiveMarqueProps = {
  items: ReactNode[];
  title: string;
  viewPortWidth: number;
};

const itemWidth = 150;
const itemGap = 16;
const ResponsiveMarque = ({ items, title, viewPortWidth }: ResponsiveMarqueProps) => {
  const theme = useMantineTheme();

  const showMarquee =
    items.length * (itemWidth * theme.scale) + (items.length - 1) * (itemGap * theme.scale) >
    viewPortWidth;
  return (
    <div>
      <Title order={3} mb="md">
        {title}
      </Title>
      {showMarquee ? (
        <div className={classes.marqueeViewport}>
          <Marquee w="100%" mt="xl">
            {items}
          </Marquee>
        </div>
      ) : (
        <Group gap="md">{items}</Group>
      )}
    </div>
  );
};
