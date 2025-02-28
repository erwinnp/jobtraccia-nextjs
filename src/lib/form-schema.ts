import { z } from 'zod';

const trimString = z.string().trim();

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: trimString.min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
  .object({
    username: trimString.min(4, 'Username must be at least 4 characters'),
    email: z.string().email('Invalid email address'),
    password: trimString.min(8, 'Password must be at least 8 characters'),
    confirmPassword: trimString.min(
      8,
      'Confirm password must be at least 8 characters'
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password not match!',
    path: ['confirmPassword'],
  });

export enum ApplicationStatus {
  Applied = 'Applied',
  InterviewScheduled = 'Interview Scheduled',
  OfferReceived = 'Offer Received',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
}

export const applicationSchema = z.object({
  position: trimString.min(1, 'Required!'),
  applicationStatus: z.nativeEnum(ApplicationStatus),
  companyName: trimString.min(1, 'Required!'),
  companyLocation: trimString.min(1, 'Required!'),
  applicationDate: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  applicationSource: trimString.min(1, 'Required!'),
});
