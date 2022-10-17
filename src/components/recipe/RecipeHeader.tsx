// Packages
import React from "react";
import { useRouter } from "next/router";

export default function RecipeHeader() {
  const router = useRouter();
  const { recipezId } = router.query;
  return (
    <div className="opacity-1/2 relative overflow-hidden bg-gray-600 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center bg-no-repeat pb-4 bg-blend-overlay">
      <div className="mx-auto max-w-7xl">
        <main className="mx-auto mt-10 max-w-7xl px-6 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="pr-15 font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Data to enrich your</span>{" "}
              <span className="block text-cyan-600 xl:inline">
                online business
              </span>
            </h1>
            <p className="mt-3 text-base text-white/70 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700 md:py-4 md:px-10 md:text-lg"
                >
                  View Author
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-cyan-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                >
                  Like Recipe?
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
