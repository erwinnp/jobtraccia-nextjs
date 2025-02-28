'use server';
import { loginSchema, registerSchema } from '@/lib/form-schema';
import { hashPassword, verifyPassword } from '@/lib/password';
import { createSession, deleteSession, verifySession } from '@/lib/session';
import { CustomZodError } from '@/lib/zod-error';
import { TAuthBody } from '../types';
import { UserService } from './service';
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  if (!session) return { error: true, message: 'Unauthenticated!' };

  const user = await UserService.getUserById(session.userId);
  return {
    error: false,
    user,
  };
});

export const registerUserAction = async (args: TAuthBody) => {
  const validateArgs = registerSchema.safeParse(args);
  if (!validateArgs.success) {
    return CustomZodError(validateArgs.error);
  }

  const userExists = await UserService.getUserByEmail(args.email);

  if (userExists) {
    return {
      error: true,
      message: 'User with this email already exists!',
    };
  }

  const hashPass = hashPassword(args.password);
  const user = await UserService.addNewUser({
    username: args.username,
    email: args.email,
    password: hashPass,
  });

  if (!user) {
    return {
      error: true,
      message: 'Failed create user. Something went wrong!',
    };
  }

  return {
    error: false,
    message: 'Your account has been created successfully',
  };
};

export const loginUserAction = async (args: Omit<TAuthBody, 'username'>) => {
  const validateArgs = loginSchema.safeParse(args);
  if (!validateArgs.success) {
    return CustomZodError(validateArgs.error);
  }

  const userExists = await UserService.getUserByEmail(args.email);

  if (!userExists || !userExists.password) {
    return {
      error: true,
      message: 'Invalid email or password',
    };
  }

  const validPassword = verifyPassword(args.password, userExists.password);

  if (!validPassword) {
    return {
      error: true,
      message: 'Invalid email or password',
    };
  }

  await createSession(userExists.id);
  return {
    error: false,
    message: 'Login successfully!',
  };
};

export const logoutUserAction = async () => {
  await deleteSession();
  return { error: false, message: 'See you broski!' };
};
