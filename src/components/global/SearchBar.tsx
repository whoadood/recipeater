// Packages
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";

// Hooks
import { useDarkmode } from "../../hooks/useDark";
import { useRouter } from "next/router";

export default function SearchBar() {
  const { darkmode } = useDarkmode();
  const router = useRouter();
  return (
    <div className="flex flex-1">
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values, { resetForm }) => {
          router.push(`/recipe/search/${values.search}`);
          resetForm();
        }}
      >
        {(formik) => {
          return (
            <Form className="flex w-full md:ml-0">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-100">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2"
                  aria-hidden="true"
                >
                  <MagnifyingGlassIcon
                    className="h-5 w-5 "
                    aria-hidden="true"
                  />
                </div>
                <Field
                  autoComplete="off"
                  name="search"
                  className={`${
                    darkmode ? "text-white" : "text-gray-900"
                  } block h-full w-full border-transparent bg-inherit py-2 pl-8 pr-3 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm`}
                  placeholder="Search transactions"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
