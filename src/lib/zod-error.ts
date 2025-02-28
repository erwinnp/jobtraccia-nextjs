import { ZodError } from 'zod';

export const CustomZodError = (error: ZodError) => {
  let errorMessages = '';

  error.issues.forEach((issue) => {
    errorMessages += `${issue.path[0]}: ${issue.message}. `;
  });

  return {
    error: true,
    message: errorMessages.trim(),
  };
};
