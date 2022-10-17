import React from "react";
import PageHeader from "../components/global/PageHeader";
import ProfileHeader from "../components/profile/ProfileHeader";

export default function profile() {
  return (
    <main>
      <PageHeader>
        <ProfileHeader />
      </PageHeader>
    </main>
  );
}
