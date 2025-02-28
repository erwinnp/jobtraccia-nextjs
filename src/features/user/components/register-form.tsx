'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { registerUserAction } from '../server/action';
import PrimaryButton from '@/components/primary-button';

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const response = await registerUserAction(values);

    if (!response.error) {
      toast(response.message);
      router.push('/login');
    }
    if (response.error) {
      toast.error(response.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5 font-inter'
      >
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Create new account</h1>
          <p className='text-balance text-sm text-muted-foreground'>
            Enter your email below to login to create your account
          </p>
        </div>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='broski'
                  {...field}
                  className='bg-zinc-950'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='broski@gmail.com'
                  {...field}
                  className='bg-zinc-950'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='password'
                  type='password'
                  {...field}
                  className='bg-zinc-950'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='confirm password'
                  type='password'
                  {...field}
                  className='bg-zinc-950'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PrimaryButton
          disabled={form.formState.isSubmitting}
          type='submit'
          className='w-full'
        >
          Register
        </PrimaryButton>
        <div className='text-center text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='underline underline-offset-4'>
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
