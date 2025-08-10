import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import {
  createTheme,
  MantineColor,
  MantineProvider,
  MantineProviderProps,
  MantineThemeOverride,
} from '@mantine/core';

const getTheme = (overrides?: Partial<MantineThemeOverride>) =>
  createTheme({
    primaryColor: 'violet',
    autoContrast: true,
    respectReducedMotion: true,
    fontSizes: {
      xl: '25px',
      lg: '22.5px',
      md: '20px',
      sm: '17.5px',
      xs: '15px',
    },
    headings: {
      sizes: {
        h1: { fontSize: '60px' },
        h2: { fontSize: '46px' },
        h3: { fontSize: '36px' },
        h4: { fontSize: '30px' },
        h5: { fontSize: '28px' },
        h6: { fontSize: '24.5px' },
      },
    },
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

  const [theme, setTheme] = useState(getTheme({ primaryColor }));
  useEffect(() => {
    setTheme(getTheme({ primaryColor }));
  }, [primaryColor]);

  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={theme}
      cssVariablesResolver={(t) => ({
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
