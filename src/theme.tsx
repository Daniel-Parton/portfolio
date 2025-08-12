import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import {
  createTheme,
  MantineColor,
  MantineProvider,
  MantineProviderProps,
  MantineThemeOverride,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const getTheme = (overrides?: Partial<MantineThemeOverride>) =>
  createTheme({
    primaryColor: 'violet',
    autoContrast: true,
    respectReducedMotion: true,
    ...overrides,
  });

type PrimaryColorContextState = {
  primaryColor: MantineColor;
  setPrimaryColor: (color: MantineColor) => void;
};

const PrimaryColorContext = createContext<PrimaryColorContextState | null>(null);

type PrimaryColorProviderProps = {
  children: ReactNode;
  defaultColor?: MantineColor;
};

const PrimaryColorProvider = ({ children, defaultColor = 'violet' }: PrimaryColorProviderProps) => {
  const [primaryColor, setPrimaryColor] = useState<MantineColor>(defaultColor);

  const value = useMemo<PrimaryColorContextState>(
    () => ({
      primaryColor,
      setPrimaryColor,
    }),
    [primaryColor]
  );
  return <PrimaryColorContext.Provider value={value}>{children}</PrimaryColorContext.Provider>;
};

const _MantineThemeProvider = ({ children, ...rest }: ThemeProviderProps) => {
  const { primaryColor } = usePrimaryColor();

  const scale = useScale();

  const [theme, setTheme] = useState(getTheme({ primaryColor, scale }));
  useEffect(() => {
    setTheme(getTheme({ primaryColor, scale }));
  }, [primaryColor, scale]);

  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={theme}
      cssVariablesResolver={() => ({
        light: {
          '--mantine-color-body': '#efeff4',
        },
        dark: {},
        variables: {},
      })}
      {...rest}
    >
      {children}
    </MantineProvider>
  );
};

export const usePrimaryColor = () => {
  const context = useContext(PrimaryColorContext);
  if (!context) {
    throw new Error('usePrimaryColor must be used within a PrimaryColorProvider');
  }
  return context;
};

interface ThemeProviderProps extends Omit<MantineProviderProps, 'theme' | 'cssVariablesResolver'> {
  children?: ReactNode;
}
export const ThemeProvider = ({ children, ...rest }: ThemeProviderProps) => {
  return (
    <PrimaryColorProvider>
      <_MantineThemeProvider {...rest}>{children}</_MantineThemeProvider>
    </PrimaryColorProvider>
  );
};

const useScale = () => {
  const isMedium = useMediaQuery('(max-width: 750px)');
  const isSmall = useMediaQuery('(max-width: 550px)');

  switch (true) {
    case isSmall:
      return 1;
    case isMedium:
      return 1.1;
    default:
      return 1.2;
  }
};
