'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BreadcrumbDashboard = () => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList className='font-inter'>
        {pathNames.map((path, index) => {
          const href = '/' + pathNames.slice(0, index + 1).join('/');
          const isLast = index === pathNames.length - 1;
          const isDashboard = path.toLowerCase() === 'dashboard';

          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                {isLast || isDashboard ? (
                  <span className='text-foreground'>
                    {decodeURIComponent(path)}
                  </span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{decodeURIComponent(path)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbDashboard;
