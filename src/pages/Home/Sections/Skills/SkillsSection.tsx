import { ReactNode } from 'react';
import { Marquee } from '@gfazioli/mantine-marquee';
import { Group, Stack, Text, Title } from '@mantine/core';
import { AngularMarqueeItem } from '@/components/BrandIcons/AngularIcon';
import { AwsMarqueeItem } from '@/components/BrandIcons/AwsIcon';
import { AzureMarqueeItem } from '@/components/BrandIcons/AzureIcon';
import { CSharpMarqueeItem } from '@/components/BrandIcons/CSharpIcon';
import { DockerMarqueeItem } from '@/components/BrandIcons/DockerIcon';
import { DotNetMarqueeItem } from '@/components/BrandIcons/DotNetIcon';
import { GcpMarqueeItem } from '@/components/BrandIcons/GcpIcon';
import { GithubMarqueeItem } from '@/components/BrandIcons/GithubIcon';
import { JavascriptMarqueeItem } from '@/components/BrandIcons/JavascriptIcon';
import { MantineMarqueeItem } from '@/components/BrandIcons/MantineIcon';
import { NextJsMarqueeItem } from '@/components/BrandIcons/NextJsIcon';
import { NextraMarqueeItem } from '@/components/BrandIcons/NextraIcon';
import { NodeJsMarqueeItem } from '@/components/BrandIcons/NodeJsIcon';
import { PostgreSqlMarqueeItem } from '@/components/BrandIcons/PostgreSqlIcon';
import { ReactMarqueeItem } from '@/components/BrandIcons/ReactIcon';
import { ReactQueryMarqueeItem } from '@/components/BrandIcons/ReactQueryIcon';
import { SalesforceMarqueeItem } from '@/components/BrandIcons/SalesforceIcon';
import { TerraformMarqueeItem } from '@/components/BrandIcons/TerraformIcon';
import { Highlighter } from '@/components/Highlighter';
import { Section } from '@/components/Section';
import { useMeasure } from '@/utils/useMeasure';

export function SkillsSection() {
  const container = useMeasure();
  const viewportWidth = container.data.bounds.width;

  return (
    <Section justify="center" navData={{ id: 'skills', label: 'Skills' }} title="What I do">
      <Stack gap="xl" w="100%" ref={container.register}>
        <Stack>
          <Text>
            With over{' '}
            <Highlighter delay={2000} action="underline">
              10 years of experience
            </Highlighter>{' '}
            building enterprise-scale applications, I handle the full software lifecycle. This
            includes scoping ideas and defining requirements, coding robust front-end and back-end
            solutions, and designing CI/CD pipelines and DevOps processes to deploy seamlessly to
            the cloud.
          </Text>
          <Text>
            On the backend, I craft scalable APIs and services using{' '}
            <Highlighter delay={2500} action="underline">
              .NET and C#
            </Highlighter>
            , often applying architectural patterns like event sourcing to handle complex data flows
            and ensure system reliability.
          </Text>
          <Text>
            On the frontend, I build intuitive, dynamic interfaces with{' '}
            <Highlighter delay={3000} action="underline">
              React, JavaScript, HTML, and CSS
            </Highlighter>
            , creating experiences that are both engaging and performant.
          </Text>
          <Text>
            In the cloud, I have architected solutions across{' '}
            <Highlighter delay={3500} action="underline">
              AWS, Azure, and GCP
            </Highlighter>
            , implementing CI/CD pipelines, infrastructure automation, and containerized
            deployments. By applying design principles like SOLID and Domain-Driven Design, I ensure
            every solution is maintainable, scalable, and ready for long-term success.
          </Text>
          <Text>
            I'm always eager to learn new things. Here are some of the technologies I work with:
          </Text>
        </Stack>
        {container.data.hasBounds && (
          <>
            <ResponsiveMarque
              items={[
                <AngularMarqueeItem key="angular" />,
                <JavascriptMarqueeItem key="js" />,
                <MantineMarqueeItem key="mantine" />,
                <NextJsMarqueeItem key="nextjs" />,
                <NextraMarqueeItem key="nextra" />,
                <NodeJsMarqueeItem key="nodejs" />,
                <ReactMarqueeItem key="react" />,
                <ReactQueryMarqueeItem key="react-query" />,
              ]}
              title="Frontend"
              viewPortWidth={viewportWidth}
            />
            <ResponsiveMarque
              items={[
                <CSharpMarqueeItem key="csharp" />,
                <DotNetMarqueeItem key="dotnet" />,
                <PostgreSqlMarqueeItem key="postgresql" />,
              ]}
              title="Backend"
              viewPortWidth={viewportWidth}
            />
            <ResponsiveMarque
              items={[
                <AwsMarqueeItem key="aws" />,
                <DockerMarqueeItem key="docker" />,
                <GcpMarqueeItem key="gcp" />,
                <GithubMarqueeItem key="github" />,
                <AzureMarqueeItem key="azure" />,
                <SalesforceMarqueeItem key="salesforce" />,
                <TerraformMarqueeItem key="terraform" />,
              ]}
              title="Infrastructure"
              viewPortWidth={viewportWidth}
            />
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
  const showMarquee = items.length * itemWidth + (items.length - 1) * itemGap > viewPortWidth;
  return (
    <div>
      <Title order={3} mb="md">
        {title}
      </Title>
      {showMarquee ? (
        <Marquee w="100%" mt="xl" fadeEdges>
          {items}
        </Marquee>
      ) : (
        <Group gap="md">{items}</Group>
      )}
    </div>
  );
};
