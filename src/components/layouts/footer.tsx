import { Github, Mail } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  const navigationItems = [
    {
      title: 'Product',
      items: [
        {
          title: 'JobTraccia Dashboard',
          icon: null,
          href: '/dashboard/all-applications',
        },
      ],
    },
    {
      title: 'Contact the creator',
      items: [
        {
          title: 'erwinp1710@gmail.com',
          icon: (
            <Mail className='w-5 h-5 text-white/40 group-hover:text-blue-700 transition-colors duration-300 ease-in-out' />
          ),
          href: 'mailto:erwinp1710@gmail.com',
        },
        {
          title: '@erwinnp',
          icon: (
            <Github className='w-5 h-5 text-white/40 group-hover:text-blue-700 transition-colors duration-300 ease-in-out' />
          ),
          href: 'https://github.com/erwinnp',
        },
      ],
    },
  ];

  return (
    <div className='w-full py-10 lg:py-20 bg-zinc-900 text-white'>
      <div className='w-full max-w-screen-xl mx-auto px-4'>
        <div className='flex flex-col gap-6 md:flex-row justify-between items-start'>
          <div className='flex gap-8 flex-col items-start'>
            <div className='flex gap-2 flex-col'>
              <h2 className='text-3xl md:text-5xl tracking-tighter max-w-xl font-urbanist text-left font-semibold'>
                Job<span className='text-blue-700'>Traccia</span>
              </h2>
              <p className='text-lg max-w-lg leading-relaxed tracking-tight text-white text-left font-inter'>
                Manage job applications, track your progress, and stay organized
                throughout your job hunt.
              </p>
            </div>
            <p className='font-inter text-sm'>
              © JobTraccia | Erwin Purnomo 2025 • All rights reserved.
            </p>
          </div>
          <div className='grid lg:grid-cols-2 gap-6 xl:gap-20 items-start'>
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className='flex text-base gap-1 flex-col items-start'
              >
                <div className='flex flex-col gap-2'>
                  <p className='text-xl font-medium font-urbanist'>
                    {item.title}
                  </p>
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        target='_blank'
                        href={subItem.href}
                        className='group flex gap-2 items-center font-inter'
                      >
                        {subItem.icon}
                        <span className='text-white/40 group-hover:text-blue-700 transition-colors duration-300 ease-in-out'>
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
