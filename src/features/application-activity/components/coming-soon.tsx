import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import VisuallyHidden from '@/components/ui/visually-hidden';
import { HourglassIcon } from 'lucide-react';

const ComingSoon = () => {
  return (
    <Card className='xl:w-1/3 xl:h-1/3 flex justify-center items-center px-4'>
      <VisuallyHidden>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </VisuallyHidden>
      <CardContent className='p-6'>
        <div className='flex flex-col justify-center items-center gap-6 py-2'>
          <HourglassIcon className='w-12 h-12 xl:w-20 xl:h-20' />
          <div className='flex flex-col items-center gap-2'>
            <p className='text-2xl xl:text-4xl font-bold'>Coming soon!</p>
            <p className='lg:text-lg'>These features will be added soon</p>
          </div>
        </div>
      </CardContent>
      <VisuallyHidden>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </VisuallyHidden>
    </Card>
  );
};

export default ComingSoon;
