import { createContext, ReactNode, useContext, useReducer } from "react";

// Actions
import { UserAction } from "./actions";

// Types
import { Person, User } from "@/utils/common/person";

type UserState = {
  enableLogs: boolean;
  selectedUser: Person | undefined;
  userData: User;
};

type UserContextValue = {
  state: UserState;
  dispatch: React.Dispatch<Action>;
};

type Action =
  | { type: UserAction.SetEnableLogs; payload: boolean }
  | { type: UserAction.SetSelectedUser; payload: Person | undefined }
  | { type: UserAction.SetUserData; payload: User };

const defaultValues: UserState = {
  enableLogs: false,
  selectedUser: undefined,
  userData: {
    backgroundImageUrl: "",
    profilePictureUrl: "",
    name: "",
    title: "",
    followers: 0,
    following: 0,
  },
};

interface Props {
  children: ReactNode;
}

export const UserContext = createContext<UserContextValue>({
  state: defaultValues,
  dispatch: () => null,
});

export const UserReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case UserAction.SetEnableLogs:
      return { ...state, enableLogs: action.payload };
    case UserAction.SetSelectedUser:
      return { ...state, selectedUser: action.payload };
    case UserAction.SetUserData:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export const UserProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(UserReducer, defaultValues);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextValue => {
  const safeContext = useContext(UserContext);
  if (!safeContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return safeContext;
};
