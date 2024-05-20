import { FunctionComponent, PropsWithChildren, useCallback } from "react";
import classNames from "classnames";

// UI
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Contexts
import { useUserContext } from "@/context/UserContext";
import { UserAction } from "@/context/actions";

type LogSwitchProps = {};

export const LogSwitch: FunctionComponent<
  PropsWithChildren<LogSwitchProps>
> = () => {
  // Context
  const {
    state: { enableLogs },
    dispatch,
  } = useUserContext();

  const toggleEnableLogs = useCallback(
    (checked: boolean) => {
      dispatch({
        type: UserAction.SetEnableLogs,
        payload: checked,
      });
    },
    [dispatch],
  );

  return (
    <div className={classNames("flex flex-row items-center space-x-2")}>
      <Switch
        id="toggle-logs"
        checked={enableLogs}
        onCheckedChange={toggleEnableLogs}
      />
      <Label htmlFor="toggle-logs">Enable Logs</Label>
    </div>
  );
};
