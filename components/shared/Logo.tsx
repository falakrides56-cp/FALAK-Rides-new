import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <div className={cn('relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-white p-1', className)}>
      <img
        src="/images/falak_ride_logo.png"
        alt="Falak Ride Official Logo"
        className="h-full w-full object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function Logo({
  className,
  showText = true,
  variant = 'default',
  size = 'md',
}: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-brand-green-900';
  const subColor = variant === 'light' ? 'text-brand-gold-300' : 'text-brand-gold-600';

  const logoDimension =
    size === 'sm'
      ? 'h-9 w-13'
      : size === 'lg'
      ? 'h-14 w-20'
      : 'h-11 w-16';

  return (
    <div className={cn('flex items-center gap-2.5 select-none', className)}>
      {/* Official Emblem Logo Badge */}
      <div className={cn('relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5', logoDimension)}>
        <img
          src="/images/falak_ride_logo.png"
          alt="Falak Ride"
          className="h-full w-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-sans text-lg sm:text-xl font-black tracking-tight', textColor)}>
            FALAK RIDE
          </span>
          <span className={cn('text-[0.62rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.2em] mt-0.5', subColor)}>
            Umrah Transport
          </span>
        </div>
      )}
    </div>
  );
}
