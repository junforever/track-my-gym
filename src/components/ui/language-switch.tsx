'use client';

import React, { useEffect, useState } from 'react';
import { Swap } from '@/components/ui/swap';
import { nextIntlEnLocale } from '@/i18n/config';
import { nextIntlEsLocale } from '@/i18n/config';
import { setCookie } from '@/lib/cookies';
import { useTranslations } from 'next-intl';

export function LanguageSwitch({ languageCookie }: { languageCookie: string }) {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('LanguageSwitchComponent');

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const handleLanguageChange = (isSwapped: boolean) => {
    setCookie(
      process.env.NEXT_PUBLIC_LOCALE_COOKIE!,
      isSwapped ? nextIntlEnLocale : nextIntlEsLocale,
    );
  };

  return (
    <Swap
      initialIcon={<span className="w-4 h-4">ES</span>}
      swappedIcon={<span className="w-4 h-4">EN</span>}
      callback={handleLanguageChange}
      initialIconTitle={t('switchToEnglish')}
      swappedIconTitle={t('switchToSpanish')}
      initialState={languageCookie === nextIntlEnLocale}
    />
  );
}

export default LanguageSwitch;
