// Packages
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

// Utils
import { classNames } from "../../utils/classNames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDarkmode } from "../../hooks/useDark";

export default function ProfileMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const { darkmode, handleDarkmode, addClasses } = useDarkmode();

  return (
    <div className="ml-4 flex items-center md:ml-6">
      <button
        onClick={handleDarkmode}
        type="button"
        className="rounded-full p-1 text-gray-400 outline-none hover:text-gray-500 focus:outline-cyan-500 focus:ring-cyan-500"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button
            className={`flex max-w-xs items-center rounded-full text-sm outline-none focus:outline-cyan-500 focus:ring-2 lg:rounded-md lg:p-2 ${
              darkmode ? "lg:hover:bg-black/50" : "lg:hover:bg-gray-200"
            }`}
          >
            {session && session.user ? (
              <>
                <img
                  className="h-8 w-8 rounded-full"
                  src={session.user.image!}
                  alt="user avatar"
                />
                <span className="ml-3 hidden text-sm font-medium lg:block">
                  <span className="sr-only">Open user menu for </span>
                  {session?.user?.name}
                </span>
              </>
            ) : (
              <>
                {" "}
                <UserCircleIcon className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-500" />
                <span className="ml-3 hidden text-sm font-medium text-white lg:block">
                  <span className="sr-only">Open user menu for </span>
                </span>
              </>
            )}
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
            <Menu.Items
              className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${addClasses()}`}
            >
              {/* Next Link with headless ui will not close menu, solution navigate via router.push */}
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() =>
                      router.push({
                        pathname: `/profile/${session.user?.id}`,
                      })
                    }
                    className={`block cursor-pointer px-4 py-2 text-sm ${
                      darkmode ? "hover:bg-black/50" : "hover:bg-gray-200/50"
                    } `}
                  >
                    My Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => signOut()}
                    className={`block cursor-pointer px-4 py-2 text-sm ${
                      darkmode ? "hover:bg-black/50" : "hover:bg-gray-200/50"
                    } `}
                  >
                    Logout
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          ) : (
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() =>
                      router.push({
                        pathname: "/signin",
                      })
                    }
                    className={`block cursor-pointer px-4 py-2 text-sm ${
                      darkmode ? "hover:bg-black/50" : "hover:bg-gray-200/50"
                    } `}
                  >
                    Login
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          )}
        </Transition>
      </Menu>
    </div>
  );
}
