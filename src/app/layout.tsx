import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import { fontInter, fontUrbanist } from '@/lib/font';
import QueryProviders from '@/components/query-providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata: Metadata = {
  title: 'JobTraccia - Track Your Job Applications',
  description:
    'JobTraccia helps you stay organized in your job search by tracking applications',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'dark antialiased',
          fontInter.variable,
          fontUrbanist.variable
        )}
      >
        <QueryProviders>
          <NuqsAdapter>{children}</NuqsAdapter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProviders>
        <Toaster />
      </body>
    </html>
  );
}
