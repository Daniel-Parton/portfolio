import {
  ActionIcon,
  ColorSwatch,
  DEFAULT_THEME,
  Group,
  MantineColor,
  Popover,
  Text,
  Tooltip,
} from '@mantine/core';
import { usePrimaryColor } from '@/theme';

export const PrimaryColorSwitcher = () => {
  const { primaryColor, setPrimaryColor } = usePrimaryColor();
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <ActionIcon size="xl" variant="default" radius="xl">
          <ColorSwatch
            size={24}
            radius="xl"
            color={`var(--mantine-color-${primaryColor}-filled)`}
          />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Group gap="xs">
          {colors.map((c) => (
            <Tooltip key={c} label={capitaliseWords(c)}>
              <ColorSwatch
                size={24}
                radius="xl"
                color={`var(--mantine-color-${c}-filled)`}
                onClick={() => setPrimaryColor(c)}
                style={{
                  cursor: 'pointer',
                  border: c === primaryColor ? `2px solid ${DEFAULT_THEME.colors[c][6]}` : 'none',
                }}
              />
            </Tooltip>
          ))}
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

const colors: MantineColor[] = [
  'dark',
  'gray',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'green',
  'lime',
  'yellow',
  'orange',
  'teal',
];

const capitaliseWords = (text: string) => {
  return !text ? text : text.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};
