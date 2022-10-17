// Packages
import React from "react";
import { useRouter } from "next/router";

export default function RecipeIdPage() {
  const router = useRouter();
  const { recipeId } = router.query;
  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')`,
      }}
      className="opacity-1/2 relative overflow-hidden bg-gray-600 bg-cover bg-fixed bg-no-repeat bg-blend-overlay md:bg-center"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="px-4 pt-8 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{"title"}</span>{" "}
              </h1>
              <div className="mt-3 text-base font-bold text-white sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                {"recipe description"}
                <div className="h-4" />
                {`By ${"author name"}`}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
