import { getRequestConfig } from 'next-intl/server';
import { nextIntlDefaultLocale } from './config';
import { getCookie } from '@/lib/cookies';

export default getRequestConfig(async () => {
  const locale = await getCookie(
    process.env.NEXT_PUBLIC_LOCALE_COOKIE!,
    nextIntlDefaultLocale,
  );

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
