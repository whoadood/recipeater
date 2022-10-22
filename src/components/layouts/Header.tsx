// Packages
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  ScaleIcon,
  ChevronDownIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

// Components
import Nav from "../global/Nav";
import SearchBar from "../global/SearchBar";
import ProfileMenu from "../global/ProfileMenu";

// Utils
import { classNames } from "../../utils/classNames";
import { useDarkmode } from "../../hooks/useDark";

const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
];

const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];

export default function Header({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkmode, addClasses } = useDarkmode();

  return (
    <>
      <div className={`h-screen ${addClasses()}`}>
        <Nav sidebar={{ sidebarOpen, setSidebarOpen }} />

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 lg:border-none">
            {/* Toggle Nav Menu */}
            <button
              type="button"
              className="border-r border-gray-400 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <SearchBar />
              <ProfileMenu />
            </div>
          </div>

          {/* Main body */}
          <div className="max-h-[94vh] flex-1 overflow-scroll bg-inherit py-2">
            {/* Page */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
