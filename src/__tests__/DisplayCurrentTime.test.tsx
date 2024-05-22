import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Views
import { DisplayCurrentTime } from "@/views/home/DisplayCurrentTime";

describe("DisplayCurrentTime", () => {
  const currentTime = new Date(1672531199000);
  const mockUpdateCurrentTime = jest.fn();

  it("should match the DisplayCurrentTime snapshot", () => {
    const testRender = render(
      <DisplayCurrentTime
        currentTime={currentTime}
        updateCurrentTime={mockUpdateCurrentTime}
      />,
    );

    expect(testRender).toMatchSnapshot();
  });

  it("should match the time format DD-MM-YYYY : hh:mm:ss", () => {
    const testRender = render(
      <DisplayCurrentTime
        currentTime={currentTime}
        updateCurrentTime={mockUpdateCurrentTime}
      />,
    );
    const displayedTimeElement = screen.getByTestId("current-time");
    const timeFormatRegex = /^\d{2}-\d{2}-\d{4} : \d{2}:\d{2}:\d{2}$/;

    expect(displayedTimeElement.textContent).toMatch(timeFormatRegex);
  });
});
