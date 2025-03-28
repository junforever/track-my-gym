import { headers } from 'next/headers';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { NavUser } from '@/components/layout/nav-user';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import { shadcnLightTheme } from '@/components/constants/themeConfig';
import { getCookie } from '@/lib/cookies';
import { LanguageSwitch } from '@/components/ui/language-switch';
import { getLocale } from 'next-intl/server';
import { CurrentRoute } from '@/components/ui/current-route';

const data = {
  user: {
    name: 'superadmin',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

export async function AppTopbar() {
  const themeCookie = await getCookie(
    process.env.NEXT_PUBLIC_THEME_COOKIE!,
    shadcnLightTheme,
  );
  const locale = await getLocale();

  const headersList = await headers();
  const fullUrl = headersList.get('x-url') || '';
  const fullPath = new URL(fullUrl).pathname;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="h-4">
          <Separator
            orientation="vertical"
            className="mr-2"
            thickness={2}
            color="white"
          />
        </div>
        <CurrentRoute fullPath={fullPath} />
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitch themeCookie={themeCookie} />
        <LanguageSwitch languageCookie={locale} />
        <NavUser user={data.user} />
      </div>
    </header>
  );
}
