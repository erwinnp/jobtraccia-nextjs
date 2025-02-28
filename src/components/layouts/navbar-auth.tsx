import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const NavbarAuth = () => {
  return (
    <header className='fixed left-1/2 top-0 z-50 mt-7 flex w-full max-w-[1100px] mx-auto -translate-x-1/2 items-center md:px-0 px-4'>
      <Link href='/' className='font-inter'>
        <Button variant='ghost'>
          <ArrowLeft /> Home
        </Button>
      </Link>
    </header>
  );
};

export default NavbarAuth;
