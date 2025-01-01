import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function Header() {
  function buttonVariants({ size, className }: { size: string; className: string }) {
    const baseClass = 'btn inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
    const sizeClass = size === 'lg' ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs';
    return `${baseClass} ${sizeClass} ${className}`;
  }

  return (
    <header className="h-16 shadow-md px-6 flex items-center justify-between bg-white">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Easy Study Logo" width={40} height={40} />
        <h2 className="font-semibold text-lg text-black-600">Easy Study</h2>
      </div>

      {/* Get Started Button */}
      <Link
        className={buttonVariants({
          size: 'lg',
          className: 'bg-blue-600 text-white hover:bg-blue-700',
        })}
        href="/dashboard"
        target="_blank"
      >
        Get started <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </header>
  );
}

export default Header;
