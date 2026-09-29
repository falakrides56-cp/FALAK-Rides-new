import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      status: {
        confirmed: 'bg-green-100 text-green-700',
        pending: 'bg-amber-100 text-amber-700',
        cancelled: 'bg-red-100 text-red-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  className?: string;
  label?: string;
}

export default function StatusBadge({ status, className, label }: StatusBadgeProps) {
  const displayLabel = label || (status ? status.charAt(0).toUpperCase() + status.slice(1) : '');
  return (
    <span className={cn(statusBadgeVariants({ status }), className)}>{displayLabel}</span>
  );
}
