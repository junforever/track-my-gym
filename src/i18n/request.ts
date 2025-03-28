import { getRequestConfig } from 'next-intl/server';
import { nextIntlEsLocale } from './config';
import { getCookie } from '@/lib/cookies';

export default getRequestConfig(async () => {
  const locale = await getCookie(
    process.env.NEXT_PUBLIC_LOCALE_COOKIE!,
    nextIntlEsLocale,
  );

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
