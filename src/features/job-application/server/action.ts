'use server';
import { verifySession } from '@/lib/session';
import { CustomZodError } from '@/lib/zod-error';
import { ApplicationService } from './service';
import { TNewApplication } from '../types';
import { applicationSchema } from '@/lib/form-schema';

export const getUserApplicationsAction = async (statusFilter?: string) => {
  const session = await verifySession();
  if (!session.userId)
    return { error: true, message: 'Unauthenticated!', applications: null };

  const applications = await ApplicationService.getUserApplications(
    session.userId,
    statusFilter
  );

  return {
    error: false,
    message: 'Successfully get all applications!',
    applications,
  };
};

export const getApplicationByIdAction = async (applicationId: string) => {
  const session = await verifySession();
  if (!session)
    return { error: true, message: 'Unauthenticated!', application: null };

  const application =
    await ApplicationService.getApplicationsById(applicationId);

  return {
    error: false,
    message: 'Successfully get all applications!',
    application,
  };
};

export const addNewApplicationAction = async (args: TNewApplication) => {
  const session = await verifySession();
  if (!session) return { error: true, message: 'Unauthenticated!' };

  const validateArgs = applicationSchema.safeParse(args);
  if (!validateArgs.success) {
    return CustomZodError(validateArgs.error);
  }

  const application = await ApplicationService.addNewApplication(
    {
      ...args,
    },
    session.userId
  );

  if (!application)
    return {
      error: true,
      message: 'Application not saved!',
    };

  return {
    error: false,
    message: 'Application saved!',
  };
};

export const updateApplicationAction = async (
  applicationId: string,
  args: Partial<TNewApplication>
) => {
  const session = await verifySession();
  if (!session) return { error: true, message: 'Unauthenticated!' };

  const validateArgs = applicationSchema.safeParse(args);
  if (!validateArgs.success) {
    return CustomZodError(validateArgs.error);
  }

  const application = await ApplicationService.updateApplication(
    applicationId,
    args
  );

  if (!application)
    return {
      error: true,
      message: 'Application not updated!',
    };

  return {
    error: false,
    message: 'Application updated!',
  };
};

export const deleteApplicationAction = async (applicationId: string) => {
  const session = await verifySession();
  if (!session)
    return { error: true, message: 'Unauthenticated!', application: null };

  const application = await ApplicationService.deleteApplication(applicationId);

  return {
    error: false,
    message: 'Successfully delete applications!',
    application,
  };
};
