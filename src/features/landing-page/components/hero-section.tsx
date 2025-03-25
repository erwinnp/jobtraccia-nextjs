import PrimaryButton from '@/components/primary-button';
import { Badge } from '@/components/ui/badge';
import { BLUR_VARIANTS, FADE_DOWN_VARIANTS } from '@/lib/framer-variant';
import { MoveRight } from 'lucide-react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <motion.section
      initial='hidden'
      animate='show'
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      className='w-full flex justify-center items-center py-36 max-sm:pb-16 px-4'
    >
      <div className='w-full max-w-screen-xl mx-auto flex flex-col gap-10'>
        <div className='flex w-full text-center justify-center items-center gap-4 flex-col'>
          <motion.div variants={FADE_DOWN_VARIANTS}>
            <Badge variant='outline' className='font-urbanist'>
              We&apos;re live!
            </Badge>
          </motion.div>
          <div className='flex gap-4 flex-col'>
            <motion.h1
              variants={FADE_DOWN_VARIANTS}
              className='text-4xl md:text-5xl lg:text-7xl tracking-tighter font-urbanist font-semibold max-w-2xl'
            >
              Track and Manage Your Job Applications Effortlessly
            </motion.h1>
            <motion.p
              variants={FADE_DOWN_VARIANTS}
              className='text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl font-inter'
            >
              Manage job applications, track your progress, and stay organized
              throughout your job hunt.
            </motion.p>
          </div>
          <motion.div variants={FADE_DOWN_VARIANTS}>
            <Link href='/register'>
              <PrimaryButton>
                Sign up and start tracking <MoveRight className='w-4 h-4' />
              </PrimaryButton>
            </Link>
          </motion.div>
        </div>
        <motion.div className='sm:px-4' variants={BLUR_VARIANTS}>
          <Image
            alt='dashboard'
            src='/dashboard.png'
            width={1920}
            height={1011}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
