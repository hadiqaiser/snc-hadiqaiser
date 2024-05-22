import { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";
import { AlertCircle } from "lucide-react";

// UI
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type UserErrorAlertProps = {};

export const UserErrorAlert: FunctionComponent<
  PropsWithChildren<UserErrorAlertProps>
> = () => {
  return (
    <Alert variant="destructive" className={classNames("w-full sm:w-8/12")}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription data-testid="alert-description">
        Failed to fetch user information
      </AlertDescription>
    </Alert>
  );
};
