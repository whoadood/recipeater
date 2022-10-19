// Packages
import React from "react";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

// Utils
import { classNames } from "../../utils/classNames";
import { Direction } from "@prisma/client";

const actions = [
  {
    title: "Request time off",
    href: "#",
    icon: ClockIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Benefits",
    href: "#",
    icon: CheckBadgeIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule a one-on-one",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Payroll",
    href: "#",
    icon: BanknotesIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Submit an expense",
    href: "#",
    icon: ReceiptRefundIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    title: "Training",
    href: "#",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

export default function DirectionsList({
  directions,
}: {
  directions: Direction[];
}) {
  return (
    <>
      <h2 className="text-sm font-medium text-gray-500">Directions</h2>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {directions.map((direc, direcIdx) => (
          <div
            key={direc.id}
            className={classNames(
              direcIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              direcIdx === 1 ? "sm:rounded-tr-lg" : "",
              direcIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              direcIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
              <span
                className={
                  "inline-flex rounded-lg bg-cyan-50 p-3 text-center text-cyan-700 ring-4 ring-white"
                }
              >
                <div className="h-6 w-6" aria-hidden="true">
                  {direc.step}
                </div>
              </span>
            </div>
            <div className="mt-8">
              <p className="mt-2 text-sm text-gray-500">{direc.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
