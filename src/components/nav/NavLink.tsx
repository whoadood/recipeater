// Packages
import React from "react";

// Types
import { NavItem } from "../../types/globals";

// Utils
import { classNames } from "../../utils/classNames";

export default function NavLink({ item }: { item: NavItem }) {
  return (
    <a
      key={item.name}
      href={item.href}
      className={classNames(
        item.current
          ? "bg-cyan-800 text-white"
          : "text-cyan-100 hover:bg-cyan-600 hover:text-white",
        "group flex items-center rounded-md px-2 py-2 text-base font-medium"
      )}
      aria-current={item.current ? "page" : undefined}
    >
      <item.icon
        className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
        aria-hidden="true"
      />
      {item.name}
    </a>
  );
}
