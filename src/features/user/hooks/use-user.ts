'use client';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../server/action';

export const useUser = () => {
  const query = useQuery({
    queryKey: ['user-authenticated'],
    queryFn: async () => {
      const response = await getCurrentUser();
      return response.error ? null : response.user;
    },
  });

  return query;
};
