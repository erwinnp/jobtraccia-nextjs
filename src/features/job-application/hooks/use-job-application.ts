'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addNewApplicationAction,
  getUserApplicationsAction,
  updateApplicationAction,
  getApplicationByIdAction,
  deleteApplicationAction,
} from '../server/action';
import { TNewApplication } from '../types';

export const useJobApplications = (statusFilter?: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['job-applications-user', statusFilter],
    queryFn: () => getUserApplicationsAction(statusFilter),
  });

  const createMutation = useMutation({
    mutationFn: addNewApplicationAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications-user'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      applicationId,
      updatedData,
    }: {
      applicationId: string;
      updatedData: Partial<TNewApplication>;
    }) => updateApplicationAction(applicationId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications-user'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteApplicationAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications-user'] });
    },
  });

  return {
    applicationsData: query.data?.applications || [],
    applicationsDataLoading: query.isLoading,
    createApplication: createMutation.mutate,
    createApplicationLoading: createMutation.isPending,
    updateApplication: updateMutation.mutate,
    updateApplicationLoading: updateMutation.isPending,
    deleteApplication: deleteMutation.mutate,
    deleteApplicationLoading: deleteMutation.isPending,
  };
};

export const useJobApplication = (applicationId: string) => {
  const query = useQuery({
    queryKey: ['job-application', applicationId],
    queryFn: () => getApplicationByIdAction(applicationId),
  });

  return {
    applicationData: query.data?.application || null,
    refetchApplicationData: query.refetch,
  };
};
