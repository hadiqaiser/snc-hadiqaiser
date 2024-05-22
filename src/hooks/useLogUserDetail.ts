import { useCallback, useEffect, useRef } from "react";

// Context
import { useUserContext } from "@/context/UserContext";

export const useLogUserDetail = (currentTime: Date) => {
  // Hooks
  const {
    state: { enableLogs, userData },
  } = useUserContext();

  const currentTimeRef = useRef(currentTime);
  const enableLogsRef = useRef(enableLogs);
  currentTimeRef.current = currentTime;
  enableLogsRef.current = enableLogs;

  const logUserData = useCallback(() => {
    if (!enableLogsRef.current) return;

    console.log("User Details:", userData);
    console.log("Current time:", currentTimeRef.current);
  }, [userData]);

  useEffect(() => {
    logUserData();
  }, [logUserData, userData]);
};
