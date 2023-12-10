'use client';

import { logoutUser } from '@/apis/user.api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const RightSideMenu = () => {
  const router = useRouter();

  const logout = async () => {
    logoutUser();
    router.push('/login');
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center ms-3">
        <div>
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </button>
        </div>
        <div
          className="z-40 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
          id="dropdown-user"
        >
          <div className="px-4 py-3" role="none">
            <p
              className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
              role="none"
            >
              email here
            </p>
          </div>
          <ul className="py-1" role="none">
            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
              <Link href="/">Dashboard</Link>
            </li>

            <li
              v-if="!isLogged"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Link href="/login">Login</Link>
            </li>

            <li onClick={logout}>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
