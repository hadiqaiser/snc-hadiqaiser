import { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";

// Custom Component
import { LoginCard } from "@/views/login/LoginCard";

type LoginProps = {};

export const LoginLayout: FunctionComponent<
  PropsWithChildren<LoginProps>
> = () => {
  return (
    <main
      className={classNames(
        "h-screen w-screen",
        "flex flex-col justify-center items-center",
      )}
    >
      <LoginCard />
    </main>
  );
};
