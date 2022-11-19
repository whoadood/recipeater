// Packagesimport React from "react";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useDarkmode } from "../hooks/useDark";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";

export default function Signin({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}) {
  const { darkmode, justFont, addClasses } = useDarkmode();
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div
        className={`flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="relative mx-auto h-12 w-12">
            {/* 400 bad request error??? */}
            <Image
              layout="fill"
              src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=500"
              alt="Recipeater logo"
            />
          </div>
          <h2
            className={`mt-6 text-center text-3xl font-bold tracking-tight ${
              darkmode ? "text-white" : "text-black"
            }`}
          >
            Sign in with your Twitter account
          </h2>
        </div>

        <div className={`sm:mx-auto sm:w-full sm:max-w-md`}>
          <div
            className={`mt-4 py-8 px-4 shadow sm:rounded-lg sm:px-10 ${
              darkmode ? "bg-[#2e2e2e] " : "bg-white"
            }`}
          >
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className={`${
                      darkmode ? "bg-[#2e2e2e] text-white" : "bg-white"
                    } px-2 text-gray-500`}
                  >
                    Continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {Object.values(providers).map((provider) => (
                  <div key={provider.id} className="col-span-3">
                    <button
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: `${window.location.origin}/`,
                        })
                      }
                      className="group inline-flex w-full justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-500 shadow-sm"
                    >
                      <span className="sr-only">
                        Sign in with {provider.name}
                      </span>
                      <svg
                        className="h-5 w-5 text-gray-500 group-hover:text-cyan-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const providers = await getProviders();

  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { providers },
  };
}
