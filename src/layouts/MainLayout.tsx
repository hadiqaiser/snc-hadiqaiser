import {
  useCallback,
  useEffect,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from "react";
import classNames from "classnames";
import axios from "axios";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Custom Component
import { DisplayCurrentTime } from "@/views/home/DisplayCurrentTime";
import { LogSwitch } from "@/views/home/LogSwitch";
import { UserErrorAlert } from "@/views/home/UserErrorAlert";
import { UserInfoCard } from "@/views/home/UserInfoCard";
import { UserSelector } from "@/views/home/UserSelector";

// Contexts
import { useUserContext } from "@/context/UserContext";
import { UserAction } from "@/context/actions";

// Hooks
import { useLogUserDetail } from "@/hooks/useLogUserDetail";

// Types
import { Person, User } from "@/utils/common/person";

// Font
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = () => {
  // State
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Hooks
  const {
    state: { selectedUser },
    dispatch,
  } = useUserContext();

  useLogUserDetail(currentTime);

  const updateCurrentTime = useCallback((time: Date) => {
    setCurrentTime(time);
  }, []);

  const getUserData = useCallback(
    async ({
      queryKey,
      signal,
    }: QueryFunctionContext<[string, Person]>): Promise<User> => {
      const [, selectedUser] = queryKey;
      const response = await axios.get(`/api/person?person=${selectedUser}`, {
        signal,
      });

      return response.data;
    },
    [],
  );

  const { data, error, isSuccess, isFetching } = useQuery({
    queryKey: ["users", selectedUser as Person],
    queryFn: getUserData,
    enabled: !!selectedUser,
  });

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch ${selectedUser} data!`);
    }
  }, [dispatch, error, selectedUser]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      dispatch({ type: UserAction.SetUserData, payload: data as User });
      toast.success(`Successfully fetched ${selectedUser} data!`);
    }
  }, [data, dispatch, isFetching, isSuccess, selectedUser]);

  return (
    <main
      className={classNames(
        inter.className,
        "h-screen w-screen",
        "flex flex-col p-6 items-center justify-between",
      )}
    >
      <section className={classNames("flex flex-col items-center w-full")}>
        {error ? <UserErrorAlert /> : <UserInfoCard loading={isFetching} />}
        <UserSelector />
      </section>
      <section
        className={classNames(
          "flex flex-row justify-between w-full sm:w-8/12 border border-gray-300 rounded-lg p-4",
        )}
      >
        <DisplayCurrentTime
          currentTime={currentTime}
          updateCurrentTime={updateCurrentTime}
        />
        <LogSwitch />
      </section>
    </main>
  );
};
