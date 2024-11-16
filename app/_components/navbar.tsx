import Image from 'next/image';
import React from 'react';

// Icons
import { Menu } from 'lucide-react';

// Components
import { Button } from './ui/button';

export const Navbar = () => {
  return (
    <header className="flex w-full h-20 justify-between items-center pt-6 desktop:pt-0 px-4">
      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="object-contain"
      />
      <Button variant={'ghost'} className="w-10 h-10 rounded-full">
        <Menu className="w-5 h-5" />
      </Button>
    </header>
  );
};
