// Packages
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { trpc } from "../../utils/trpc";

// Components
import ProfileHeader from "../../components/profile/ProfileHeader";
import PageHeader from "../../components/global/PageHeader";
import ProfileList from "../../components/profile/ProfileList";

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
    <>
      <Head>
        <title>{profile.data?.profile.name}</title>
        <meta
          name="description"
          content={`Profile for ${profile.data?.profile.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageHeader>
          {profile.data && <ProfileHeader data={profile.data} />}
        </PageHeader>
        {profile.data && <ProfileList data={profile.data} />}
      </main>
    </>
  );
}
