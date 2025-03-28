'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Swap } from '@/components/ui/swap';
import {
  shadcnLightTheme,
  shadcnDarkTheme,
} from '@/components/constants/themeConfig';
import { setCookie } from '@/lib/cookies';
import { useTranslations } from 'next-intl';

export function ThemeSwitch({ themeCookie }: { themeCookie: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('ThemeSwitchComponent');

  useEffect(() => {
    setMounted(true);
    setTheme(themeCookie);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (isSwapped: boolean) => {
    setTheme(isSwapped ? shadcnDarkTheme : shadcnLightTheme);
    setCookie(
      process.env.NEXT_PUBLIC_THEME_COOKIE!,
      isSwapped ? shadcnDarkTheme : shadcnLightTheme,
    );
  };

  return (
    <Swap
      initialIcon={<Sun className="h-4 w-4" />}
      initialIconTitle={t('switchToDarkMode')}
      swappedIcon={<Moon className="h-4 w-4" />}
      swappedIconTitle={t('switchToLightMode')}
      initialState={theme === shadcnDarkTheme}
      callback={handleThemeChange}
    />
  );
}

export default ThemeSwitch;
