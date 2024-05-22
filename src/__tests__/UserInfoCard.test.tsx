import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Views
import { UserInfoCard } from "@/views/home/UserInfoCard";

// Context
import { useUserContext } from "@/context/UserContext";

// Mock useUserContext
jest.mock("../context/UserContext", () => ({
  useUserContext: jest.fn(),
}));

describe("UserInfoCard", () => {
  const mockUserData = {
    backgroundImageUrl: "/images/fallbackBgImg.svg",
    profilePictureUrl: "/images/fallbackProfileImg.svg",
    name: "John Doe",
    title: "Software Engineer",
    followers: 100,
    following: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserContext as jest.Mock).mockReturnValue({
      state: { userData: mockUserData },
    });
  });

  it("should match the UserInfoCard snapshot", () => {
    const testRender = render(<UserInfoCard loading={false} />);

    expect(testRender).toMatchSnapshot();
  });

  it("should render skeletons when loading", () => {
    render(<UserInfoCard loading={true} />);

    const skeletons = screen.getAllByTestId("card-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should render user data when not loading", () => {
    render(<UserInfoCard loading={false} />);

    expect(screen.getByAltText("bg-pic")).toHaveAttribute(
      "src",
      mockUserData.backgroundImageUrl,
    );
    expect(screen.getByAltText("profile-pic")).toHaveAttribute(
      "src",
      mockUserData.profilePictureUrl,
    );
    expect(screen.getByText(mockUserData.name)).toBeInTheDocument();
    expect(screen.getByText(mockUserData.title)).toBeInTheDocument();
    expect(
      screen.getByText(mockUserData.followers.toString()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockUserData.following.toString()),
    ).toBeInTheDocument();
  });

  it("should render fallback images and text when userData is missing", () => {
    (useUserContext as jest.Mock).mockReturnValue({
      state: { userData: {} },
    });
    render(<UserInfoCard loading={false} />);

    expect(screen.getByAltText("bg-pic")).toHaveAttribute(
      "src",
      "/images/fallbackBgImg.svg",
    );
    expect(screen.getByAltText("profile-pic")).toHaveAttribute(
      "src",
      "/images/fallbackProfileImg.svg",
    );
    expect(screen.getByText("No User")).toBeInTheDocument();
  });
});
