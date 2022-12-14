// Packages
import { inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import React from "react";
import useToggle from "../../hooks/useToggle";
import { AppRouter } from "../../server/trpc/router/_app";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Image from "next/image";

// Utils
import { BioSchema } from "../../types/schemas";
import { trpc } from "../../utils/trpc";
import { router } from "../../server/trpc/trpc";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDarkmode } from "../../hooks/useDark";

const defaultUser = (
  <svg
    className="h-20 w-20 rounded-full text-gray-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  role: "Human Resources Manager",
  imageUrl: defaultUser,
};

export default function ProfileHeader({
  data,
}: {
  data: inferProcedureOutput<AppRouter["profile"]["getProfileById"]>;
}) {
  const { profile } = data;
  const router = useRouter();
  const { data: session } = useSession();
  const { darkmode, justFont, addClasses } = useDarkmode();
  const { toggle: editBio, handleToggle: handleEditBio } = useToggle();
  const { toggle: activeRecipeList, handleToggle: handleActiveRecipeList } =
    useToggle();
  const tUtils = trpc.useContext();
  const bioMutation = trpc.profile.editBio.useMutation({
    onSuccess: () => {
      tUtils.profile.getProfileById.invalidate();
      handleEditBio();
    },
  });

  const stats = [
    { label: "Total recipes", value: profile.recipes.length, href: null },
    {
      label: "most used category",
      value: profile.recipes.find(
        (el) => el.category_id === data.mostCategory?.category_id
      )?.category.name,
      href: `/recipe/search/${
        profile.recipes.find(
          (el) => el.category_id === data.mostCategory?.category_id
        )?.category.name
      }`,
    },
    {
      label: "most liked recipe",
      value: profile.recipes.find((el) => el.id === data.mostLiked?.recipe_id)
        ?.title,
      href: `/recipe/${data.mostLiked?.recipe_id}`,
    },
  ];

  return (
    <main>
      <section aria-labelledby="profile-overview-title">
        <div className="overflow-hidden rounded-lg  shadow">
          <h2 className="sr-only" id="profile-overview-title">
            Profile Overview
          </h2>
          <div
            className={`p-6 ${darkmode ? "bg-[#2e2e2e]" : "bg-gray-200/50"}`}
          >
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  {profile && profile.image ? (
                    <div className="relative mx-auto h-16 w-16">
                      <Image
                        layout="fill"
                        className="rounded-full"
                        src={profile.image as string}
                        alt="user avatar"
                      />
                    </div>
                  ) : (
                    user.imageUrl
                  )}
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  {/* <p className="text-sm font-medium text-gray-600">
                    Welcome back,
                  </p> */}
                  <p
                    className={`text-xl font-bold sm:text-2xl ${
                      darkmode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {profile ? profile.name : "username"}
                  </p>
                  {!editBio ? (
                    <div className="flex justify-center gap-2">
                      <p className="text-sm font-medium text-gray-400">
                        {profile && profile.profile?.bio
                          ? profile.profile?.bio
                          : "bio"}
                      </p>
                      {session && session.user?.id === router.query.id && (
                        <PencilIcon
                          onClick={handleEditBio}
                          className="h-4 w-4 cursor-pointer text-gray-400"
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
                            } resize-none rounded ${
                              darkmode ? "bg-inherit" : "bg-gray-200/50"
                            } px-2 outline-none focus:border-2 focus:border-cyan-500`}
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
              {session && (
                <div className="mt-5 flex justify-center sm:mt-0">
                  <Link href="/recipe/create">
                    <a className="flex items-center justify-center rounded-md border bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700">
                      Create recipe
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {stats.map((stat) =>
              stat.href ? (
                <Link key={stat.label} href={stat.href ? stat.href : ""}>
                  <a
                    className={`px-6 py-5 text-center text-sm font-medium ${
                      darkmode
                        ? "bg-[#2e2e2e] hover:bg-[#1e1e1e]"
                        : "bg-gray-200/50 hover:bg-gray-200"
                    }`}
                  >
                    <span className="text-lg font-bold text-cyan-500">
                      {stat.value}
                    </span>{" "}
                    <br />
                    <span className={`${justFont()}`}>{stat.label}</span>
                  </a>
                </Link>
              ) : (
                <div
                  key={stat.label}
                  className={`px-6 py-5 text-center text-sm font-medium ${
                    darkmode ? "bg-[#2e2e2e]" : "bg-gray-200/50"
                  }`}
                >
                  <span className="text-lg font-bold text-cyan-500">
                    {stat.value}
                  </span>{" "}
                  <br />
                  <span className={`${justFont()}`}>{stat.label}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
