// Packages
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

// Components
import RecipeForm from "../../components/recipe/createForm/CreateRecipeForm";

export default function create() {
  return (
    <main className="px-2 py-4">
      <RecipeForm />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
