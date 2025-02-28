'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useJobApplications } from '../hooks/use-job-application';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import ApplicationSheet from './application-sheet-wrapper';
import DeleteDialog from './delete-dialog';
import { useSearchParams } from 'next/navigation';

const ApplicationTable = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const {
    applicationsData,
    applicationsDataLoading,
    deleteApplicationLoading,
  } = useJobApplications(filter?.toString());

  if (applicationsDataLoading || deleteApplicationLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>Loading applications...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-10 w-full mb-2' />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>
          Manage job applications, track your progress, and stay organized
        </CardDescription>
      </CardHeader>
      <CardContent>
        {applicationsData.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-64'>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='hidden xl:table-cell'>Company</TableHead>
                <TableHead className='hidden 2xl:table-cell'>
                  Location
                </TableHead>
                <TableHead className='hidden xl:table-cell'>
                  Application Date
                </TableHead>
                <TableHead className='hidden 2xl:table-cell'>
                  Application Source
                </TableHead>
                <TableHead className='md:w-52 text-center'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicationsData.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className='font-medium py-5'>
                    {application.position}
                  </TableCell>
                  <TableCell className='py-5'>
                    <Badge variant='outline'>
                      {application.applicationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className='hidden xl:table-cell py-5'>
                    {application.companyName}
                  </TableCell>
                  <TableCell className='hidden 2xl:table-cell py-5'>
                    {application.companyLocation}
                  </TableCell>
                  <TableCell className='hidden xl:table-cell py-5'>
                    {format(
                      new Date(application.applicationDate),
                      'dd MMMM yyyy'
                    )}
                  </TableCell>
                  <TableCell className='hidden 2xl:table-cell py-5'>
                    {application.applicationSource}
                  </TableCell>
                  <TableCell className='py-5'>
                    <div className='flex justify-center items-center gap-4'>
                      <ApplicationSheet
                        isEdit={true}
                        applicationId={application.id}
                      />
                      <DeleteDialog applicationId={application.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className='text-sm text-muted-foreground py-4'>
            No applications found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationTable;
