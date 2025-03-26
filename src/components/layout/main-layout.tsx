import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppTopbar } from '@/components/layout/app-topbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppTopbar />
        <main className="flex-1 overflow-hidden py-2 px-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
