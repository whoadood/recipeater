// Packages
import React from "react";

// Components
import PageHeader from "../../components/global/PageHeader";
import BrowsePageHeader from "../../components/browse/BrowsePageHeader";
import BrowseList from "../../components/browse/BrowseList";

export default function BrowsePage() {
  return (
    <>
      <main>
        <PageHeader>
          <BrowsePageHeader />
        </PageHeader>
        <div>
          <BrowseList />
        </div>
      </main>
    </>
  );
}
