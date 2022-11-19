// Packages
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

// Components
import RecipeForm from "../../components/recipe/createForm/CreateRecipeForm";

export default function create() {
  return (
    <>
      <Head>
        <title>Create recipe</title>
        <meta
          name="description"
          content={`Create a recipe to share with the world`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-2 py-4">
        <RecipeForm />
      </main>
    </>
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
