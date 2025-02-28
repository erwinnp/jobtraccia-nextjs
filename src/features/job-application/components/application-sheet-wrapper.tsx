'use client';
import PrimaryButton from '@/components/primary-button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { PlusCircle, Pencil } from 'lucide-react';
import { useState } from 'react';
import ApplicationForm from './application-form';
import { Button } from '@/components/ui/button';

type TApplicationSheetProps = {
  applicationId?: string;
  isEdit?: boolean;
};

const ApplicationSheet = ({
  isEdit = false,
  applicationId,
}: TApplicationSheetProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      {isEdit ? (
        <Button
          onClick={handleOpen}
          variant='secondary'
          className='lg:w-28'
          size='sm'
        >
          <Pencil className='h-4 w-4' />
          <span className='sr-only lg:not-sr-only sm:whitespace-nowrap'>
            Edit
          </span>
        </Button>
      ) : (
        <PrimaryButton onClick={handleOpen}>
          <PlusCircle className='h-4 w-4' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            New application
          </span>
        </PrimaryButton>
      )}
      <SheetContent className='w-full md:max-w-2xl space-y-4'>
        <SheetHeader>
          <SheetTitle>
            {isEdit ? 'Edit Job Application' : 'Add a New Job Application'}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update your job application details.'
              : 'Keep track of your job applications by logging details like job title, company, application date, and status.'}
          </SheetDescription>
        </SheetHeader>
        <ApplicationForm
          applicationId={applicationId}
          onClose={handleClose}
          isEdit={isEdit}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ApplicationSheet;
