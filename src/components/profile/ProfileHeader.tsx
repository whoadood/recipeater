// Packages
import { inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import React from "react";
import { AppRouter } from "../../server/trpc/router/_app";

// Utils
const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  role: "Human Resources Manager",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export default function ProfileHeader({
  profile,
}: {
  profile: inferProcedureOutput<AppRouter["profile"]["getProfileById"]>;
}) {
  return (
    <main>
      {" "}
      <section aria-labelledby="profile-overview-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <h2 className="sr-only" id="profile-overview-title">
            Profile Overview
          </h2>
          <div className="bg-white p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img
                    className="mx-auto h-20 w-20 rounded-full"
                    src={profile ? (profile.image as string) : user.imageUrl}
                    alt="user avatar"
                  />
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  {/* <p className="text-sm font-medium text-gray-600">
                    Welcome back,
                  </p> */}
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {profile ? profile.name : "username"}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {profile && profile.profile?.bio
                      ? profile.profile?.bio
                      : "bio"}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                <Link href="/recipe/create">
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-md border bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700"
                  >
                    Create recipe
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-6 py-5 text-center text-sm font-medium"
              >
                <span className="text-gray-900">{stat.value}</span>{" "}
                <span className="text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
