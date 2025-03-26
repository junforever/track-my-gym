'use client';

import * as React from 'react';
import Image from 'next/image';
import { NavMain } from '@/components/layout/nav-main';
// import { NavProjects } from '@/components/layout/nav-projects';
// import { NavSecondary } from '@/components/layout/nav-secondary';
//import { NavUser } from '@/components/layout/nav-user';
import {
  Sidebar,
  SidebarContent,
  //SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { appSidebarOptions } from './appSidebarOptions';

// const data = {
//   user: {
//     name: 'shadcn',
//     email: 'm@example.com',
//     avatar: '/avatars/shadcn.jpg',
//   },
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white">
                  <Image
                    src="/images/track-my-gym-logo.png"
                    width={32}
                    height={32}
                    alt="Track My Gym"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Track My Gym</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={appSidebarOptions.navMain} />
        {/* <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>
      </SidebarFooter> */}
    </Sidebar>
  );
}
