import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Views
import { UserErrorAlert } from "@/views/home/UserErrorAlert";

describe("User Error Alert", () => {
  it("should match the UserErrorAlert snapshot", () => {
    const testRender = render(<UserErrorAlert />);

    expect(testRender).toMatchSnapshot();
  });
});
