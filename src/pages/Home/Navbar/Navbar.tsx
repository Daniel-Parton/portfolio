import { MouseEvent } from 'react';
import cx from 'clsx';
import { ArrowDownToDotIcon, ArrowUpFromDot } from 'lucide-react';
import {
  ActionIcon,
  Anchor,
  Group,
  Image,
  NavLink,
  Paper,
  Stack,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { PrimaryColorSwitcher } from '@//components/PrimaryColorSwitcher';
import { ScrollProgress } from '@//components/ScrollProgress';
import { ColorSchemeSwitcher } from '@/components/ColorSchemeSwitcher';
import { useNavScrollData } from '@/utils/useNavScrollData';
import classes from './Navbar.module.css';

export function Navbar() {
  const { links, activeIndex } = useNavScrollData();
  const showPreviousButton = activeIndex > 0;
  const showNextButton = activeIndex < links.length;
  const showNavButtons = showPreviousButton || showNextButton;

  const scrollToSection = (index: number) => {
    if (index <= 0) {
      goHome();
      return;
    }

    const link = links.find((x) => x.index === index);
    if (!link) return;
    window.location.hash = `#${link.id}`;
    link.getNode()?.scrollIntoView({ behavior: 'smooth' });
  };

  const goHome = () => {
    window.history.replaceState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <ScrollProgress topOffset={80} className="content-container" />
      {showNavButtons && (
        <Stack gap="xs" className={classes.navButtons}>
          {showPreviousButton && (
            <Tooltip label="Previous section">
              <ActionIcon
                size={50}
                radius="xl"
                variant="default"
                onClick={() => scrollToSection(activeIndex - 1)}
              >
                <ArrowUpFromDot size={24} />
              </ActionIcon>
            </Tooltip>
          )}
          {showNextButton && (
            <Tooltip label="Next section">
              <ActionIcon
                size={50}
                radius="xl"
                variant="default"
                onClick={() => scrollToSection(activeIndex + 1)}
              >
                <ArrowDownToDotIcon size={24} />
              </ActionIcon>
            </Tooltip>
          )}
        </Stack>
      )}

      <Paper className={classes.root}>
        <Group
          justify="space-between"
          align="center"
          className={cx(classes.content, 'content-container')}
        >
          <Group align="center">
            <LogoButton
              activeNavIndex={activeIndex}
              onClick={(e) => {
                e.preventDefault();
                goHome();
              }}
            />
            <div className={classes.linksContainer}>
              {links.map((l) => (
                <NavLink
                  active={l.isActive}
                  key={l.id}
                  className={classes.link}
                  href={`/#${l.id}`}
                  label={l.label}
                />
              ))}
            </div>
          </Group>
          <Group align="center" flex="0 0 auto">
            <PrimaryColorSwitcher />
            <ColorSchemeSwitcher />
          </Group>
        </Group>
      </Paper>
    </>
  );
}

type LogoButtonProps = {
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  activeNavIndex: number;
};
const LogoButton = ({ activeNavIndex, onClick }: LogoButtonProps) => {
  const noLinkActive = activeNavIndex === 0;

  return (
    <>
      <Anchor href="/#" pos="relative" onClick={onClick}>
        <Image
          src="/assets/sunnies.png"
          alt="sunglasses"
          height={80}
          width={80}
          className={classes.logoSunnies}
          mod={{ active: !noLinkActive }}
        />
        <ThemeIcon radius="xl" size={50} variant={noLinkActive ? 'light' : 'transparent'}>
          <Image
            src="/assets/logo.png"
            alt="logo"
            height={80}
            width={80}
            className={classes.logo}
          />
        </ThemeIcon>
      </Anchor>
    </>
  );
};
