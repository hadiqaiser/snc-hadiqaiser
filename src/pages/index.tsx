import { MainLayout } from "@/layouts/MainLayout";
import { NextPage, GetServerSidePropsContext } from "next";

// Utils
import { createClient } from "@/utils/supabase/server-props";

const Home: NextPage = () => {
  return <MainLayout />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: data.user,
    },
  };
}

export default Home;
