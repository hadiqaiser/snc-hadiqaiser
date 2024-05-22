import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Views
import { UserSelector } from "@/views/home/UserSelector";

// Context
import { useUserContext } from "@/context/UserContext";
import { UserAction } from "@/context/actions";

// Utils
import { Person } from "@/utils/common/person";

jest.mock("../context/UserContext", () => ({
  useUserContext: jest.fn(),
}));

describe("UserSelector", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserContext as jest.Mock).mockReturnValue({
      state: { selectedUser: null },
      dispatch: mockDispatch,
    });
  });

  it("should match the UserSelector snapshot", () => {
    const testRender = render(<UserSelector />);

    expect(testRender).toMatchSnapshot();
  });

  it("should render all person buttons", () => {
    render(<UserSelector />);

    Object.values(Person).forEach((person) => {
      const button = screen.getByText(person);
      expect(button).toBeInTheDocument();
    });
  });

  it("should call dispatch with correct action when a button is clicked", () => {
    render(<UserSelector />);

    const button = screen.getByText(Person.PersonA);

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: UserAction.SetSelectedUser,
      payload: Person.PersonA,
    });
  });

  it("should apply border-black class to the selected user button", () => {
    const selectedPerson = Person.PersonA;
    (useUserContext as jest.Mock).mockReturnValue({
      state: { selectedUser: selectedPerson },
      dispatch: mockDispatch,
    });

    render(<UserSelector />);

    const selectedButton = screen.getByText(selectedPerson);
    expect(selectedButton).toHaveClass("border-black");
  });
});
