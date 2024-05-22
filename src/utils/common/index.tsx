import { GetServerSidePropsContext } from "next";

// Utils
import { createClient } from "@/utils/supabase/server-props";

export const authorizeUser = async (context: GetServerSidePropsContext) => {
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
};
