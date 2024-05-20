import {
  useEffect,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";

// Context
import { formatDateAndTime } from "@/utils/client";

// Font
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

type DisplayCurrentTimeProps = {
  currentTime: Date;
  updateCurrentTime: (time: Date) => void;
};

export const DisplayCurrentTime: FunctionComponent<
  PropsWithChildren<DisplayCurrentTimeProps>
> = ({ currentTime, updateCurrentTime }) => {
  // States
  const [isMounted, setIsMounted] = useState(false);

  const formattedTime = useMemo(
    () => formatDateAndTime(currentTime),
    [currentTime],
  );

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      updateCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [updateCurrentTime]);

  return (
    <p className={classNames(robotoMono.className, "leading-7")}>
      {isMounted && formattedTime}
    </p>
  );
};
