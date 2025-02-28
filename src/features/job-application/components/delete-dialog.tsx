'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useJobApplications } from '../hooks/use-job-application';
import { toast } from 'sonner';
import VisuallyHidden from '@/components/ui/visually-hidden';

type TDeleteDialogProps = {
  applicationId: string;
};

const DeleteDialog = ({ applicationId }: TDeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const { deleteApplication } = useJobApplications();

  const handleDelete = () => {
    deleteApplication(applicationId, {
      onSuccess: (data) => {
        toast(data.message);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' className='lg:w-28' size='sm'>
          <TrashIcon className='w-8 h-8' />
          <span className='sr-only lg:not-sr-only sm:whitespace-nowrap'>
            Delete
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </VisuallyHidden>
          <DialogDescription className='text-lg flex gap-4 text-center flex-col justify-center items-center'>
            <Trash className='w-20 h-20 text-rose-600' />
            Are you sure you want to delete this? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className='w-full flex gap-4'>
          <Button
            onClick={() => setOpen(false)}
            variant='destructive'
            className='w-full'
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} variant='secondary' className='w-full'>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
