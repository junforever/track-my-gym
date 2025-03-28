import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { NavUser } from '@/components/layout/nav-user';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import { shadcnLightTheme } from '@/components/constants/themeConfig';
import { getCookie } from '@/lib/cookies';

const data = {
  user: {
    name: 'superadmin',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

export async function AppTopbar() {
  const cookieTheme = await getCookie(
    process.env.NEXT_PUBLIC_THEME_COOKIE!,
    shadcnLightTheme,
  );
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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitch cookieTheme={cookieTheme} />
        {/* <Swap
          initialIcon={<span className="w-4 h-4">ES</span>}
          swappedIcon={<span className="w-4 h-4">EN</span>}
          callback={() => {}}
        /> */}
        <NavUser user={data.user} />
      </div>
    </header>
  );
}
