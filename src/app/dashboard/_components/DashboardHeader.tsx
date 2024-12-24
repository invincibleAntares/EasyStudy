import { UserButton } from '@clerk/nextjs';
import React from 'react';

function DashboardHeader() {
  return (
    <div className="p-5 shadow-md flex items-center justify-between bg-white ">
      <div className="flex-1 flex justify-center">
        <div className="text-lg font-semibold text-gray-700">
          Welcome
        </div>
      </div>
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
