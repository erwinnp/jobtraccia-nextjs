'use client';
import PrimaryButton from '@/components/primary-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import VisuallyHidden from '@/components/ui/visually-hidden';
import { useUser } from '@/features/user/hooks/use-user';
import Link from 'next/link';

const AccountCard = () => {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return (
      <Card className='w-full max-w-lg mx-4'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            <Skeleton className='h-10 w-24 mx-auto' />
          </CardTitle>
          <VisuallyHidden>
            <Skeleton className='h-4 w-32' />
          </VisuallyHidden>
        </CardHeader>
        <CardContent className='w-full flex flex-col gap-4 items-center'>
          <Skeleton className='size-20 rounded-full' />
          <Skeleton className='h-9 w-full' />
          <Skeleton className='h-9 w-full' />
        </CardContent>
        <CardFooter>
          <Skeleton className='h-9 w-full' />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className='w-full max-w-lg mx-4'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>
          Account
        </CardTitle>
        <VisuallyHidden>
          <CardDescription>Card Description</CardDescription>
        </VisuallyHidden>
      </CardHeader>
      <CardContent className='w-full flex flex-col gap-4 items-center'>
        <Avatar className='size-20 rounded-full'>
          <AvatarFallback className='rounded-full text-4xl pb-2'>
            {data?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Input
          value={data?.username || ''}
          type='text'
          placeholder='username'
          disabled
        />
        <Input
          value={data?.email || ''}
          type='text'
          placeholder='email'
          disabled
        />
      </CardContent>
      <CardFooter>
        <Link href='/dashboard/all-applications' className='w-full'>
          <PrimaryButton className='w-full'>Back to dashboard</PrimaryButton>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
