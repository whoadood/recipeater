// Packages
import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { IRecipeData } from "../../../types/globals";
import { recipeRouter } from "../../../server/trpc/router/recipe";

// Components
import RecipeForm from "../../../components/recipe/createForm/CreateRecipeForm";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function EditRecipePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = trpc.recipe.getRecipeById.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );

  return (
    <>
      <Head>
        <title>Edit {data?.title ?? "recipe"}</title>
        <meta name="description" content={`Edit ${data?.title ?? "recipe"}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-7xl">
        {data && <RecipeForm editing={true} recipe={data} />}
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
