// Packages
import React from "react";

// Components
import Hero from "../components/global/Hero";
import PageHeader from "../components/global/PageHeader";
import NewPageHeader from "../components/newPage/NewPageHeader";

export default function newPage() {
  return (
    <div>
      <PageHeader>
        <NewPageHeader />
      </PageHeader>
    </div>
  );
}
