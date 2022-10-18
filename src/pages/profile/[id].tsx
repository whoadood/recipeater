// Packages
import React from "react";
import { useRouter } from "next/router";
import PageHeader from "../../components/global/PageHeader";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileList from "../../components/profile/ProfileList";
import { trpc } from "../../utils/trpc";

export default function ProfilePage() {
  const router = useRouter();
  const profile = trpc.profile.getProfileById.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );
  return (
    <main>
      <PageHeader>
        <ProfileHeader profile={profile.data!} />
      </PageHeader>
      <ProfileList />
    </main>
  );
}
