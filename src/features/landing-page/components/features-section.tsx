import { Briefcase, ListChecks, Rocket, Hand } from 'lucide-react';
import { FADE_DOWN_VARIANTS } from '@/lib/framer-variant';
import * as motion from 'motion/react-client';

const FeaturesSection = () => {
  const featuresContent = [
    {
      title: 'Track Applications',
      subtitle: 'Keep track with ease.',
      icon: <Briefcase className='w-6 h-6 mb-4 text-primary' />,
    },
    {
      title: 'Stay Organized',
      subtitle: 'Track and update statuses.',
      icon: <ListChecks className='w-6 h-6 mb-4 text-primary' />,
    },
    {
      title: 'Fast & Reliable',
      subtitle: "We've made it fast and reliable.",
      icon: <Rocket className='w-6 h-6 mb-4 text-primary' />,
    },
    {
      title: 'Easy to Use',
      subtitle: 'Simple and intuitive.',
      icon: <Hand className='w-6 h-6 mb-4 text-primary' />,
    },
  ];

  return (
    <div className='w-full max-w-screen-xl mx-auto px-4'>
      <motion.div
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.45,
            },
          },
        }}
        className='grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-8'
      >
        {featuresContent.map((feature) => (
          <motion.div
            variants={FADE_DOWN_VARIANTS}
            key={feature.title}
            className='flex gap-0 flex-col justify-between p-6 border rounded-md'
          >
            {feature.icon}
            <h2 className='text-lg md:text-2xl text-left font-urbanist font-semibold'>
              {feature.title}
            </h2>
            <p className='text-base font-inter leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left'>
              {feature.subtitle}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturesSection;
