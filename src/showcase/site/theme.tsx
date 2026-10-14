import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { GLASS_DEFAULTS } from 'glass-design-system';
import type { GlassConfig, GlassPalette, GlassTexture } from 'glass-design-system';

/** Everything the site's Theme panel controls. Remembered per browser. */
export interface SiteTheme extends GlassConfig {
  palette: GlassPalette;
  texture: GlassTexture;
  motion: boolean;
}

export const THEME_DEFAULTS: SiteTheme = { ...GLASS_DEFAULTS, palette: 'kiln', texture: 'grain', motion: true };

const KEY = 'glass-showcase-theme';

const load = (): SiteTheme => {
  try {
    return { ...THEME_DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
  } catch {
    return THEME_DEFAULTS;
  }
};

interface ThemeValue {
  theme: SiteTheme;
  setTheme: (patch: Partial<SiteTheme>) => void;
  resetTheme: () => void;
  isDefault: boolean;
}

const ThemeContext = createContext<ThemeValue | null>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setState] = useState<SiteTheme>(load);
  const setTheme = useCallback((patch: Partial<SiteTheme>) => setState((t) => ({ ...t, ...patch })), []);
  const resetTheme = useCallback(() => setState(THEME_DEFAULTS), []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(theme));
    } catch {
      // Private mode or blocked storage: the theme just won't be remembered.
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resetTheme,
      isDefault: (Object.keys(THEME_DEFAULTS) as (keyof SiteTheme)[]).every((k) => theme[k] === THEME_DEFAULTS[k]),
    }),
    [theme, setTheme, resetTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme needs a ThemeProvider');
  return ctx;
};
