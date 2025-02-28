import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type TPrimaryButton = {
  type?: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const PrimaryButton = ({
  children,
  type,
  className,
  disabled,
  onClick,
}: TPrimaryButton) => {
  return (
    <Button
      size='lg'
      type={type}
      disabled={disabled}
      className={cn(
        'bg-blue-700 hover:bg-blue-800 text-white font-inter',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
