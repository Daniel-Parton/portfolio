import { Divider, List, Stack, Text } from '@mantine/core';
import { Section } from '@/components/Section';
import { AllExperience, ExperienceItem, getExperienceDateDisplay } from './ExperienceSection.data';

export function ExperienceSection() {
  return (
    <Section navData={{ id: 'experience', label: 'Experience' }} title="Where I've Worked">
      <Stack gap="xl">
        {AllExperience.map((e, i) => (
          <Item key={i} experience={e} isLast={i === AllExperience.length - 1} />
        ))}
      </Stack>
    </Section>
  );
}

type ItemProps = {
  experience: ExperienceItem;
  isLast: boolean;
};
const Item = ({ experience, isLast }: ItemProps) => {
  const hasAchievements = !!experience.keyAchievements && experience.keyAchievements.length! > 0;

  return (
    <>
      <Stack gap="lg">
        <Stack gap={0}>
          <Text size="lg" lh={1.1} fw={600}>
            {experience.position} @ {experience.employer}
          </Text>
          <Text size="sm" c="dimmed">
            {getExperienceDateDisplay(experience)}
          </Text>
        </Stack>
        <Text>{experience.summary}</Text>
        {hasAchievements && (
          <Stack gap="sm">
            <Text size="lg" lh={1.1} fw={600}>
              Key Achievements
            </Text>

            <List spacing="sm" maw="98%">
              {experience.keyAchievements!.map((a) => (
                <List.Item key={a.description}>
                  {!!a.label && (
                    <>
                      <strong>{a.label}</strong>
                      {'. '}
                    </>
                  )}
                  {a.description}
                </List.Item>
              ))}
            </List>
          </Stack>
        )}
      </Stack>
      {!isLast && <Divider />}
    </>
  );
};
