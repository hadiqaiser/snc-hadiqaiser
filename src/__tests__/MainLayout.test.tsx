import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Layout
import { MainLayout } from "@/layouts/MainLayout";

// Context
import { useUserContext } from "@/context/UserContext";
import { UserAction } from "@/context/actions";

// Mock dependencies
jest.mock("../context/UserContext", () => ({
  useUserContext: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("axios");

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock("../hooks/useLogUserDetail", () => ({
  useLogUserDetail: jest.fn(),
}));

describe("MainLayout", () => {
  const mockDispatch = jest.fn();
  const mockUserData = {
    backgroundImageUrl: "/images/fallbackBgImg.svg",
    profilePictureUrl: "/images/fallbackProfileImg.svg",
    name: "John Doe",
    title: "Software Engineer",
    followers: 100,
    following: 200,
  };
  beforeAll(() => {
    const mockDate = new Date(2024, 0, 1, 12, 0, 0); // January 1, 2024, 12:00:00
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserContext as jest.Mock).mockReturnValue({
      state: { selectedUser: "JohnDoe", userData: mockUserData },
      dispatch: mockDispatch,
    });

    (useQuery as jest.Mock).mockReturnValue({
      data: mockUserData,
      error: false,
      isSuccess: true,
      isFetching: false,
    });
  });

  it("should match the MainLayout snapshot", () => {
    const testRender = render(<MainLayout />);

    expect(testRender).toMatchSnapshot();
  });

  it("should render all components correctly", () => {
    render(<MainLayout />);

    expect(screen.getByText("Enable Logs")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "bg-pic" })).toHaveAttribute(
      "src",
      expect.stringContaining("/images/fallbackBgImg.svg"),
    );
    expect(screen.getByRole("img", { name: "profile-pic" })).toHaveAttribute(
      "src",
      expect.stringContaining("/images/fallbackProfileImg.svg"),
    );
  });

  it("should dispatch action and show success toast on successful data fetch", async () => {
    render(<MainLayout />);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: UserAction.SetUserData,
        payload: mockUserData,
      });
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Successfully fetched JohnDoe data!",
    );
  });

  it("should show error toast on data fetch failure", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isSuccess: false,
      isFetching: false,
    });

    render(<MainLayout />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to fetch JohnDoe data!");
    });

    expect(screen.getByText("Enable Logs")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("should render UserErrorAlert when there is an error", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isSuccess: false,
      isFetching: false,
    });

    render(<MainLayout />);

    expect(screen.getByTestId("alert-description")).toBeInTheDocument();
  });

  it("should render UserInfoCard with loading state when data is fetching", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: false,
      isSuccess: false,
      isFetching: true,
    });

    render(<MainLayout />);

    const skeletons = screen.getAllByTestId("card-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
