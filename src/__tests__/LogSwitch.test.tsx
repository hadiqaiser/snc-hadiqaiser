import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Views
import { LogSwitch } from "@/views/home/LogSwitch";

// Context
import { useUserContext } from "@/context/UserContext";
import { UserAction } from "@/context/actions";

jest.mock("../context/UserContext", () => ({
  useUserContext: jest.fn(),
}));

describe("Log Switch", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserContext as jest.Mock).mockReturnValue({
      state: { enableLogs: false },
      dispatch: mockDispatch,
    });
  });
  it("should match the LogSwitch snapshot", () => {
    const testRender = render(<LogSwitch />);

    expect(testRender).toMatchSnapshot();
  });

  it("should render correctly with initial state", () => {
    render(<LogSwitch />);

    const switchElement = screen.getByRole("switch");
    const labelElement = screen.getByText("Enable Logs");

    expect(switchElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  it("should call dispatch with correct action when toggled", () => {
    render(<LogSwitch />);

    let switchElement = screen.getByRole("switch");

    fireEvent.click(switchElement);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: UserAction.SetEnableLogs,
      payload: true,
    });
  });
});
