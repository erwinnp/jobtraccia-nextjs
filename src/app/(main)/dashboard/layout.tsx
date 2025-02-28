import BreadcrumbDashboard from '@/components/layouts/breadcrumb-dashboard';
import { AppSidebar } from '@/components/layouts/sidebar-app';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b'>
          <SidebarTrigger className='ml-1' />
          <BreadcrumbDashboard />
        </header>
        <main className='w-full min-h-[calc(100svh-4rem)] font-inter'>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
