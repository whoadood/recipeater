// Packages
import React from "react";
import { useRouter } from "next/router";
import PageHeader from "../../components/global/PageHeader";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileList from "../../components/profile/ProfileList";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <main>
      <PageHeader>
        <ProfileHeader />
      </PageHeader>
      <ProfileList />
    </main>
  );
}
