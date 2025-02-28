'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Activity, Notebook } from 'lucide-react';
import { SideNavUser } from './sidenav-user';
import { SideNavMain } from './sidenav-main';
import VisuallyHidden from '../ui/visually-hidden';

const sideNavMenu = [
  {
    name: 'All applications',
    url: '/dashboard/all-applications',
    icon: Notebook,
  },
  {
    name: 'Application activity',
    url: '/dashboard/application-activity',
    icon: Activity,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className='font-inter' collapsible='icon' {...props}>
      <SidebarHeader>
        <SideNavUser />
      </SidebarHeader>
      <SidebarContent>
        <SideNavMain sideNavMenu={sideNavMenu} />
      </SidebarContent>
      <VisuallyHidden>
        <SidebarFooter>Footer</SidebarFooter>
      </VisuallyHidden>
      <SidebarRail />
    </Sidebar>
  );
}
