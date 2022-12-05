import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ErrorBoundary from "../../../components/ErrorBoundary/ErrorBoundary";

import MemberProfile from "../../../components/MemberProfile/MemberProfile";

interface ProfilePageProps {
  username: string;
}

const ProfilePage: NextPage<ProfilePageProps> = (props: ProfilePageProps) => {
  return (
    <ErrorBoundary>
      <MemberProfile username={props.username} />;
    </ErrorBoundary>
  );
};

// @ts-ignore
export async function getServerSideProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      username: params.username,
    },
  };
}

export default ProfilePage;
