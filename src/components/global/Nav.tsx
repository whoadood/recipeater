// Packages
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Utils
import NavLink from "../nav/NavLink";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

const secondaryNavigation = [
  { name: "Settings", href: "#", icon: CogIcon },
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];

export default function Nav({
  sidebar,
}: {
  sidebar: {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  };
}) {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = sidebar;
  const [currentActive, setCurrentActive] = useState(router.asPath);
  const { data: session } = useSession();
  const { data: topCategories } = trpc.category.getTopCategory.useQuery();

  const navigation = session
    ? [
        { name: "Home", href: "/", icon: HomeIcon },
        { name: "Browse", href: "/recipe/search/all", icon: ClockIcon },
        {
          name: "Profile",
          href: `/profile/${session.user?.id}`,
          icon: ScaleIcon,
        },
        { name: "Create", href: "/recipe/create", icon: CreditCardIcon },
      ]
    : [
        { name: "Home", href: "/", icon: HomeIcon },
        { name: "Browse", href: "/recipe", icon: ClockIcon },
      ];

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                    alt="Easywire logo"
                  />
                </div>
                <nav
                  className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        item={{
                          ...item,
                          current: item.href === currentActive,
                        }}
                        setCurrentActive={setCurrentActive}
                      />
                    ))}
                  </div>
                  <div className="mt-6 pt-6">
                    <div className="space-y-1 px-2">
                      {topCategories?.map((cat) => (
                        <Link key={cat.id} href={`/browse`}>
                          <a
                            className={
                              "group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white"
                            }
                          >
                            <div
                              className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                              aria-hidden="true"
                            />
                            {cat.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
              alt="Easywire logo"
            />
          </div>
          <nav
            className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  item={{ ...item, current: item.href === router.asPath }}
                  setCurrentActive={setCurrentActive}
                />
              ))}
            </div>
            <div className="mt-6 pt-6">
              <div className="space-y-1 px-2">
                <p className="pl-2 text-sm font-bold text-gray-300">
                  Top categories
                </p>
                {topCategories?.map((cat) => (
                  <Link key={cat.id} href={`/recipe/search/`}>
                    <a
                      className={
                        "group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white"
                      }
                    >
                      <div className="flex items-center justify-center rounded bg-cyan-900 px-2">
                        {cat._count.recipes}
                      </div>
                      <div
                        className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                        aria-hidden="true"
                      />
                      {cat.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
