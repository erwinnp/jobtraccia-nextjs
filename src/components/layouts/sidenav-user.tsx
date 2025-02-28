'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUser } from '@/features/user/hooks/use-user';
import { logoutUserAction } from '@/features/user/server/action';
import { useQueryClient } from '@tanstack/react-query';
import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function SideNavUser() {
  const { isMobile } = useSidebar();
  const { data, isLoading } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogoutUser = async () => {
    queryClient.clear();
    const response = await logoutUserAction();
    if (!response.error) {
      toast(response.message);
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <div className='w-full flex items-center gap-2'>
              <div className='h-8 w-8 rounded-lg bg-zinc-800 animate-pulse' />
              <div className='flex flex-col gap-1 flex-1'>
                <div className='h-4 w-20 bg-zinc-800 animate-pulse rounded' />
                <div className='h-3 w-32 bg-zinc-800 animate-pulse rounded' />
              </div>
              <ChevronsUpDown className='ml-auto size-4 text-zinc-800' />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarFallback className='rounded-lg'>
                  {data?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  Hello {data?.username}
                </span>
                <span className='truncate text-xs'>{data?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg mt-2'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={8}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarFallback className='rounded-lg'>
                    {data?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {data?.username}
                  </span>
                  <span className='truncate text-xs'>{data?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href='/dashboard/account'>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleLogoutUser}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
