import { FunctionComponent, PropsWithChildren, useCallback } from "react";
import classNames from "classnames";

// UI
import { Button } from "@/components/ui/button";

// Contexts
import { useUserContext } from "@/context/UserContext";
import { UserAction } from "@/context/actions";

// Common
import { Person } from "@/utils/common/person";

type UserSelectorProps = {};

export const UserSelector: FunctionComponent<
  PropsWithChildren<UserSelectorProps>
> = () => {
  // Hooks
  const {
    state: { selectedUser },
    dispatch,
  } = useUserContext();

  const handleUserChange = useCallback(
    (person: Person) => {
      dispatch({
        type: UserAction.SetSelectedUser,
        payload: person,
      });
    },
    [dispatch],
  );

  return (
    <div
      className={classNames(
        "w-full sm:w-8/12 flex flex-col sm:flex-row gap-4 justify-evenly mt-8",
      )}
    >
      {Object.values(Person).map((person) => (
        <Button
          variant={"outline"}
          key={person}
          onClick={() => handleUserChange(person)}
          className={classNames({ "border-black": selectedUser === person })}
        >
          {person}
        </Button>
      ))}
    </div>
  );
};
