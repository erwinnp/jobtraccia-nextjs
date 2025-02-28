import NavbarAuth from '@/components/layouts/navbar-auth';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarAuth />
      <main>{children}</main>
    </>
  );
}
