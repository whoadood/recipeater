import React from "react";
import PageHeader from "../components/global/PageHeader";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileList from "../components/profile/ProfileList";

export default function profile() {
  return (
    <main>
      <PageHeader>
        <ProfileHeader />
      </PageHeader>
      <ProfileList />
    </main>
  );
}
