'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Swap } from '@/components/ui/swap';
import {
  shadcnLightTheme,
  shadcnDarkTheme,
} from '@/components/constants/themeConfig';

// Higher Order Component that wraps Swap component for theme switching
export function ThemeSwitch({ cookieTheme }: { cookieTheme: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setTheme(cookieTheme);
  }, []);

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return null;
  }

  const handleThemeChange = (isSwapped: boolean) => {
    setTheme(isSwapped ? shadcnDarkTheme : shadcnLightTheme);
    document.cookie = `${process.env.NEXT_PUBLIC_THEME_COOKIE}=${
      isSwapped ? shadcnDarkTheme : shadcnLightTheme
    }; path=/; secure; sameSite=Strict`;
  };

  return (
    <Swap
      initialIcon={<Sun className="h-4 w-4" />}
      initialIconTitle="Switch to dark mode"
      swappedIcon={<Moon className="h-4 w-4" />}
      swappedIconTitle="Switch to light mode"
      initialState={theme === shadcnDarkTheme}
      callback={handleThemeChange}
    />
  );
}

export default ThemeSwitch;
