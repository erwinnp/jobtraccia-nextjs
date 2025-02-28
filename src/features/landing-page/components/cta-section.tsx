import PrimaryButton from '@/components/primary-button';
import { Badge } from '@/components/ui/badge';
import { FADE_DOWN_VARIANTS } from '@/lib/framer-variant';
import { MoveRight } from 'lucide-react';
import * as motion from 'motion/react-client';
import Link from 'next/link';

const CTASection = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            duration: 2,
          },
        },
      }}
      className='w-full max-w-screen-xl mx-auto py-20 xl:py-40 px-4'
    >
      <motion.div
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.8 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.45,
            },
          },
        }}
        className='flex flex-col text-center bg-zinc-900 rounded-md p-4 lg:p-14 gap-8 items-center'
      >
        <motion.div variants={FADE_DOWN_VARIANTS}>
          <Badge className='font-urbanist'>Get started</Badge>
        </motion.div>
        <div className='flex flex-col gap-2'>
          <motion.h3
            variants={FADE_DOWN_VARIANTS}
            className='text-3xl md:text-5xl tracking-tighter max-w-xl font-urbanist font-semibold'
          >
            Try Job<span className='text-blue-700'>Traccia</span> today!
          </motion.h3>
          <motion.p
            variants={FADE_DOWN_VARIANTS}
            className='text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-inter'
          >
            Managing job applications can be overwhelming. Avoid unnecessary
            stress by ditching scattered notes and messy spreadsheets. Our goal
            is to making tracking and organizing applications easier than ever.
          </motion.p>
        </div>
        <motion.div variants={FADE_DOWN_VARIANTS}>
          <Link href='/register'>
            <PrimaryButton>
              Start tracking today <MoveRight className='w-4 h-4' />
            </PrimaryButton>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default CTASection;
