import { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";
import Image from "next/image";

// UI
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Contexts
import { useUserContext } from "@/context/UserContext";

type UserInfoProps = {
  loading: boolean;
};

export const UserInfoCard: FunctionComponent<
  PropsWithChildren<UserInfoProps>
> = ({ loading }) => {
  // Hooks
  const {
    state: { userData },
  } = useUserContext();

  return (
    <Card className={classNames("relative w-full sm:w-8/12 h-auto")}>
      {loading ? (
        <Skeleton className={classNames("w-full h-52")} />
      ) : (
        <div className={classNames("relative w-full h-52")}>
          <Image
            src={userData.backgroundImageUrl || "/images/fallbackBgImg.svg"}
            alt="bg-pic"
            fill={true}
            className={classNames("rounded-md object-cover")}
          />
        </div>
      )}
      <div className={classNames("pb-6 px-6")}>
        <div
          className={classNames(
            "relative -mt-16 px-4 flex justify-start sm:-mt-20",
          )}
        >
          <div className={classNames("relative w-32 h-32 sm:w-40 sm:h-40")}>
            {loading ? (
              <Skeleton
                className={classNames("rounded-full w-32 h-32 sm:w-40 sm:h-40")}
              />
            ) : (
              <Image
                src={
                  userData.profilePictureUrl || "/images/fallbackProfileImg.svg"
                }
                alt="profile-pic"
                fill={true}
                className={classNames("rounded-full object-cover")}
              />
            )}
          </div>
        </div>
        <div
          className={classNames("flex flex-col sm:flex-row justify-between")}
        >
          <div className={classNames("flex flex-col gap-2 mt-3")}>
            {loading ? (
              <Skeleton className={classNames("h-8 w-40")} />
            ) : (
              <h3
                className={classNames(
                  "scroll-m-20 text-2xl font-semibold tracking-tight",
                )}
              >
                {userData.name || "No User"}
              </h3>
            )}
            {loading ? (
              <Skeleton className={classNames("h-7 w-48")} />
            ) : (
              <p className={classNames("text-xl text-muted-foreground")}>
                {userData.title}
              </p>
            )}
          </div>
          <div
            className={classNames("flex flex-row gap-5 mt-3 justify-evenly")}
          >
            <div
              className={classNames(
                "flex flex-col justify-between py-3 items-center",
              )}
            >
              {loading ? (
                <Skeleton className="h-6 w-12" />
              ) : (
                <p className={classNames("text-base text-muted-foreground")}>
                  {userData.followers}
                </p>
              )}
              <p className={classNames("text-base")}>Followers</p>
            </div>
            <Separator orientation="vertical" />
            <div
              className={classNames(
                "flex flex-col justify-between py-3 items-center",
              )}
            >
              {loading ? (
                <Skeleton className="h-6 w-12" />
              ) : (
                <p className={classNames("text-base text-muted-foreground")}>
                  {userData.following}
                </p>
              )}
              <p className={"text-base"}>Following</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
