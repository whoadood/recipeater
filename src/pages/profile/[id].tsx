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
      onError: (errors) => {
        console.log("prof query errors", errors);
        // 3 retries showing skeleton profile then ugly flash to 404 page
        router.push("/404");
      },
    }
  );
  return (
    <main className="max-h-[90vh] overflow-scroll">
      <PageHeader>
        {profile.data && <ProfileHeader data={profile.data} />}
      </PageHeader>
      {profile.data && <ProfileList data={profile.data} />}
    </main>
  );
}
