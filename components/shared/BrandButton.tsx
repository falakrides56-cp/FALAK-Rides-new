import { cn } from '@/lib/utils';
import { Button as UIButton, ButtonProps as UIButtonProps } from '@/components/ui/button';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const brandButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-brand-green-600 to-brand-green-500 text-white shadow-green hover:shadow-green-lg hover:-translate-y-0.5',
        gold:
          'bg-gradient-to-r from-brand-gold-600 via-brand-gold-300 to-brand-gold-500 text-brand-green-700 shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5',
        outline:
          'border-2 border-brand-green-200 bg-white text-brand-green-700 hover:border-brand-gold-400 hover:bg-brand-green-50',
        ghost: 'text-brand-green-700 hover:bg-brand-green-50',
        light: 'bg-white text-brand-green-700 hover:bg-brand-gold-50 shadow-soft',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface BrandButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'href'>,
    VariantProps<typeof brandButtonVariants> {
  href?: string;
  external?: boolean;
}

export default function BrandButton({
  className,
  variant,
  size,
  href,
  external,
  children,
  ...props
}: BrandButtonProps) {
  const classes = cn(brandButtonVariants({ variant, size, className }));

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
