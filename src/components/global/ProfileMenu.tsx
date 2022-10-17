// Packages
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, BellIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

// Utils
import { classNames } from "../../utils/classNames";
import Link from "next/link";

export default function ProfileMenu() {
  const { data: session } = useSession();

  console.log("prof menu session", session);

  return (
    <div className="ml-4 flex items-center md:ml-6">
      <button
        type="button"
        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
              <span className="sr-only">Open user menu for </span>
              Emilia Birch
            </span>
            <ChevronDownIcon
              className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {session ? (
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => signOut()}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Logout
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          ) : (
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/signin">
                    <a
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Login
                    </a>
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          )}
        </Transition>
      </Menu>
    </div>
  );
}
