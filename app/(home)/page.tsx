import React from 'react';
import { Navbar } from '../_components/navbar';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="flex items-center-justify-center bg-slate-600 h-full">
        <div className="h-screen"></div>
      </div>
    </div>
  );
}
