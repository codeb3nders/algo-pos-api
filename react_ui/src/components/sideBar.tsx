// 'use client';

import { ChevronFirst, MoreVertical } from 'lucide-react';
export default function SideBar({ children }: any) {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-algo-green-1 border-r shadow-m">
        <div className="p-4 pb-2 flex justify-between items-centr">
          <img
            src="https://img.logoipsum.com/243.svg"
            alt="Logo"
            className="w-32"
          />
          <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            <ChevronFirst />
          </button>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
        <div className="border-t px-3">
          <img
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
          flex justify-between items-center w-52 ml-3
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Jose Michael</h4>
              <span className="text-sm text-gray-600"></span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
