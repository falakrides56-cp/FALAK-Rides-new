import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  center = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl', className)}>
      {eyebrow && (
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-600">
          {eyebrow}
        </span>
      )}
      <h2 className="font-sans text-2xl font-bold tracking-tight text-brand-green-800 md:text-3xl lg:text-4xl">
        {title} {highlight && <span className="text-gradient-gold">{highlight}</span>}
      </h2>
      {description && (
        <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
      )}
    </div>
  );
}
