import { MainLayout } from '@/components/layout/main-layout';
import { handleActiveSession } from '@/modules/auth/serverActions/nextAuth/AuthActions';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await handleActiveSession();

  if (!session) {
    redirect('/login');
  }
  return <MainLayout>{children}</MainLayout>;
}
