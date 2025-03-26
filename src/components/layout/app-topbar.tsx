'use client';
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
import { Swap } from '@/components/ui/swap';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
const data = {
  user: {
    name: 'superadmin',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

export function AppTopbar() {
  const { setTheme } = useTheme();
  const handleSwap = (isSwapped: boolean) => {
    setTheme(isSwapped ? 'dark' : 'light');
  };

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
      <div className="flex items-center gap-2">
        <Swap
          initialIcon={<Moon className="w-4 h-4" />}
          swappedIcon={<Sun className="w-4 h-4" />}
          callback={handleSwap}
        />
        <NavUser user={data.user} />
      </div>
    </header>
  );
}
