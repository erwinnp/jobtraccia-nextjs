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
import { applicationSchema, ApplicationStatus } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PrimaryButton from '@/components/primary-button';
import {
  useJobApplication,
  useJobApplications,
} from '../hooks/use-job-application';
import { toast } from 'sonner';
import { useEffect } from 'react';

type TApplicationFormProps = {
  onClose: () => void;
  isEdit?: boolean;
  applicationId?: string;
};

const ApplicationForm = ({
  onClose,
  isEdit,
  applicationId,
}: TApplicationFormProps) => {
  const {
    createApplication,
    updateApplication,
    createApplicationLoading,
    updateApplicationLoading,
  } = useJobApplications();
  const { applicationData, refetchApplicationData } = useJobApplication(
    applicationId!
  );

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      position: '',
      companyName: '',
      companyLocation: '',
      applicationSource: '',
    },
  });

  useEffect(() => {
    if (applicationData && applicationData.applicationStatus) {
      form.reset({
        position: applicationData.position,
        companyName: applicationData.companyName,
        companyLocation: applicationData.companyLocation,
        applicationSource: applicationData.applicationSource,
        applicationStatus:
          applicationData.applicationStatus as ApplicationStatus,
        applicationDate: applicationData.applicationDate,
      });
    }
  }, [applicationData, form]);

  const onSubmit = (values: z.infer<typeof applicationSchema>) => {
    if (isEdit && applicationData?.id) {
      updateApplication(
        {
          applicationId: applicationData.id,
          updatedData: values,
        },
        {
          onSuccess: (data) => {
            toast(data.message);
            onClose();
            refetchApplicationData();
          },
        }
      );
    } else {
      createApplication(values, {
        onSuccess: (data) => {
          toast(data.message);
          onClose();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5 font-inter'
      >
        <FormField
          control={form.control}
          name='position'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  placeholder='Digital marketing'
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
          name='applicationStatus'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Status</FormLabel>
              <FormControl>
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select an application status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Applied'>Applied</SelectItem>
                    <SelectItem value='Interview Scheduled'>
                      Interview Scheduled
                    </SelectItem>
                    <SelectItem value='Offer Received'>
                      Offer Received
                    </SelectItem>
                    <SelectItem value='Rejected'>Rejected</SelectItem>
                    <SelectItem value='Withdrawn'>Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='companyName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='NexusGroup'
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
          name='companyLocation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Location</FormLabel>
              <FormControl>
                <Input
                  placeholder='Surabaya, Indonesia'
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
          name='applicationDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Application Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'text-left font-normal hover:bg-zinc-950 hover:text-muted-foreground',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='applicationSource'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Source</FormLabel>
              <FormControl>
                <Input
                  placeholder='LinkedIn'
                  {...field}
                  className='bg-zinc-950'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PrimaryButton
          disabled={createApplicationLoading || updateApplicationLoading}
          type='submit'
          className='w-full'
        >
          {isEdit ? 'Update Application' : 'Save Application'}
        </PrimaryButton>
      </form>
    </Form>
  );
};

export default ApplicationForm;
