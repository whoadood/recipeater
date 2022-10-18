// Packages
import { inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import React from "react";
import useToggle from "../../hooks/useToggle";
import { AppRouter } from "../../server/trpc/router/_app";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Utils
import { BioSchema } from "../../types/schemas";
import { trpc } from "../../utils/trpc";
import { router } from "../../server/trpc/trpc";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
  const router = useRouter();
  const { data: session } = useSession();
  const { toggle: editBio, handleToggle: handleEditBio } = useToggle();
  const tUtils = trpc.useContext();
  const bioMutation = trpc.profile.editBio.useMutation({
    onSuccess: () => {
      tUtils.profile.getProfileById.invalidate();
      handleEditBio();
    },
  });

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
                  {!editBio ? (
                    <div className="flex gap-2">
                      <p className="text-sm font-medium text-gray-600">
                        {profile && profile.profile?.bio
                          ? profile.profile?.bio
                          : "bio"}
                      </p>
                      {session && session.user?.id === router.query.id && (
                        <PencilIcon
                          onClick={handleEditBio}
                          className="h-4 w-4 cursor-pointer text-gray-600"
                        />
                      )}
                    </div>
                  ) : (
                    <Formik
                      initialValues={{
                        bio: profile?.profile?.bio || "",
                      }}
                      validationSchema={toFormikValidationSchema(BioSchema)}
                      onSubmit={(values) => {
                        console.log("onsubmit", values.bio);
                        bioMutation.mutate({ bio: values.bio });
                      }}
                    >
                      {({ handleSubmit, errors, touched }) => (
                        <Form>
                          <Field
                            as="textarea"
                            name="bio"
                            autoFocus
                            onKeyDown={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                              console.log("e.code", e);
                              if (e.code === "Escape") {
                                handleEditBio();
                              }
                              if (e.code === "Enter") {
                                handleSubmit();
                              }
                            }}
                            className={`${
                              errors.bio &&
                              touched.bio &&
                              "border-2 border-red-500"
                            } resize-none rounded bg-gray-200/50 px-2 outline-none focus:border-2 focus:border-cyan-500`}
                            rows={3}
                          />
                          {errors.bio && touched.bio ? (
                            <p className="text-red-600">{errors.bio}</p>
                          ) : null}
                        </Form>
                      )}
                    </Formik>
                  )}
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
