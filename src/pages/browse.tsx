// Packages
import React from "react";

// Components
import PageHeader from "../components/global/PageHeader";
import BrowsePageHeader from "../components/browse/BrowsePageHeader";
import Head from "next/head";
import BrowseList from "../components/browse/BrowseList";

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
