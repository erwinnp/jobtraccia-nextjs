import ApplicationSheet from '@/features/job-application/components/application-sheet-wrapper';
import ApplicationTable from '@/features/job-application/components/application-table';
import FilterButton from '@/features/job-application/components/filter-button';
import { Suspense } from 'react';

const AllApplicationsPage = async () => {
  return (
    <main className='flex flex-col gap-4 items-center justify-center'>
      <section className='w-full grid p-4 sm:p-6 gap-2 md:gap-4'>
        <Suspense>
          <div className='flex items-center'>
            <FilterButton />
            <div className='ml-auto flex items-center gap-2'>
              <ApplicationSheet />
            </div>
          </div>
          <ApplicationTable />
        </Suspense>
      </section>
    </main>
  );
};

export default AllApplicationsPage;
