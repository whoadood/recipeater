// Packages
import React from "react";

// Components
import PageHeader from "../../../components/global/PageHeader";
import BrowsePageHeader from "../../../components/browse/BrowsePageHeader";
import BrowseList from "../../../components/browse/BrowseList";
import { trpc } from "../../../utils/trpc";
import { useRouter } from "next/router";

export default function BrowsePage() {
  const { query } = useRouter();
  const { data } = trpc.recipe.getRecipesBySearch.useQuery(
    {
      search:
        query?.search && query.search !== "all"
          ? (query.search as string)
          : null,
    },
    { enabled: !!query.search }
  );

  return (
    <>
      {data && (
        <main>
          <PageHeader>
            <BrowsePageHeader />
          </PageHeader>
          <div className="pt-2">
            <BrowseList recipes={data} />
          </div>
        </main>
      )}
    </>
  );
}
