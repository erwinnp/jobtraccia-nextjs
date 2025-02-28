import { FADE_DOWN_VARIANTS } from '@/lib/framer-variant';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import PrimaryButton from '../primary-button';

export default function Navbar() {
  return (
    <motion.header
      initial='hidden'
      animate='show'
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className='fixed left-1/2 top-0 z-50 mt-7 flex w-full max-w-[1100px] mx-auto -translate-x-1/2 items-center md:px-0 px-4'
    >
      <motion.nav
        variants={FADE_DOWN_VARIANTS}
        className='w-full rounded-md bg-zinc-950/20 p-3 backdrop-blur-lg'
      >
        <div className='flex w-full items-center justify-between'>
          <Link href='/' className='text-3xl font-semibold font-urbanist'>
            Job<span className='text-blue-700 font-bold'>Traccia</span>
          </Link>
          <Link href='/dashboard/all-applications'>
            <PrimaryButton>Dashboard</PrimaryButton>
          </Link>
        </div>
      </motion.nav>
    </motion.header>
  );
}
