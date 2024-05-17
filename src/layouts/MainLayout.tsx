import { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";
import Image from "next/image";

// Font
import { Inter } from "next/font/google";

// UI
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Common
import { Person } from "@/utils/common/person";

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = () => {
  return (
    <main
      className={classNames(
        inter.className,
        "h-screen w-screen",
        "flex flex-col p-6 items-center",
      )}
    >
      <Card className={classNames("relative w-full sm:w-8/12 h-auto")}>
        <div className={classNames("relative w-full h-52")}>
          <Image
            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
            alt="bg-pic"
            layout="fill"
            className={classNames("rounded-md object-cover")}
          />
        </div>
        <div className={classNames("pb-6 px-6")}>
          <div
            className={classNames(
              "relative -mt-16 px-4 flex justify-start sm:-mt-20",
            )}
          >
            <div className={classNames("relative w-32 h-32 sm:w-40 sm:h-40")}>
              <Image
                src="https://images.squarespace-cdn.com/content/v1/51efe10de4b025019c37bb06/1566986917034-2MGUTZB04MU2GFSPAC10/London-corporate-headshot-photography.jpg"
                alt="profile-pic"
                layout="fill"
                className={classNames("rounded-full object-cover")}
              />
            </div>
          </div>
          <div
            className={classNames("flex flex-col sm:flex-row justify-between")}
          >
            <div className={classNames("flex flex-col gap-2 mt-3")}>
              <h3
                className={classNames(
                  "scroll-m-20 text-2xl font-semibold tracking-tight",
                )}
              >
                Hadi Qaiser
              </h3>
              <p className={classNames("text-xl text-muted-foreground")}>
                Software Engineer
              </p>
            </div>
            <div
              className={classNames("flex flex-row gap-5 mt-3 justify-evenly")}
            >
              <div
                className={classNames(
                  "flex flex-col justify-between py-3 items-center",
                )}
              >
                <p className={classNames("text-base text-muted-foreground")}>
                  1000
                </p>
                <p className={classNames("text-base")}>Followers</p>
              </div>
              <Separator orientation="vertical" />
              <div
                className={classNames(
                  "flex flex-col justify-between py-3 items-center",
                )}
              >
                <p className={classNames("text-base text-muted-foreground")}>
                  500
                </p>
                <p className={"text-base"}>Following</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div
        className={classNames(
          "w-full sm:w-8/12 flex flex-row justify-evenly mt-8",
        )}
      >
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Person" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Person</SelectLabel>
              {Object.values(Person).map((person) => (
                <SelectItem key={person} value={person}>
                  {person}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </main>
  );
};
