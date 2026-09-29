'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Car,
  Users,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/Logo';
import { LogoIcon } from '@/components/shared/Logo';

const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { label: 'Fleet', href: '/admin/fleet', icon: Car },
  { label: 'Drivers', href: '/admin/drivers', icon: Users },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Don't show admin chrome on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-brand-green-50/30">
      {/* Sidebar - desktop */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-60 flex-col border-r border-brand-green-100/60 bg-white lg:flex">
        <AdminSidebar pathname={pathname} />
      </aside>

      {/* Sidebar - mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-brand-green-700 hover:bg-brand-green-50"
            >
              <X className="h-5 w-5" />
            </button>
            <AdminSidebar pathname={pathname} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="lg:ml-60">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-brand-green-100/60 bg-white/95 px-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-green-700 hover:bg-brand-green-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-48 rounded-lg border border-brand-green-100/80 bg-brand-green-50/30 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-brand-green-700 hover:bg-brand-green-50">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-gold-500" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-400 text-xs font-bold text-white">
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function AdminSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-brand-green-100/60 px-4">
        <Link href="/admin" className="flex items-center gap-2.5">
          <LogoIcon className="h-8 w-11 shadow-sm" />
          <div className="flex flex-col leading-none">
            <span className="font-sans text-sm font-extrabold tracking-tight text-brand-green-800">FALAK RIDE</span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-brand-gold-600">Admin Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {adminNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-gradient-to-r from-brand-green-600 to-brand-green-500 text-white shadow-green'
                  : 'text-brand-green-700/80 hover:bg-brand-green-50 hover:text-brand-green-700'
              )}
            >
              <item.icon className={cn('h-4 w-4', active ? 'text-brand-gold-300' : 'text-brand-gold-500')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-brand-green-100/60 p-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-brand-green-800 transition-colors hover:bg-brand-green-50"
        >
          <LogOut className="h-4 w-4 text-brand-gold-600" />
          Back to Public Site
        </Link>
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('falak_admin_session');
              window.location.href = '/admin/login';
            }
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 text-left"
        >
          <LogOut className="h-4 w-4 text-red-500" />
          Sign Out of Admin
        </button>
      </div>
    </div>
  );
}
