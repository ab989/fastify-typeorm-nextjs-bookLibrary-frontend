// ErrorProvider.test.tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ErrorProvider, useGlobalError } from "@/components/contextProviders/ErrorProvider";
import toast from "react-hot-toast";

// Mock toast.error
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

// Helper component to test context consumption
const TestComponent = () => {
  const { message } = useGlobalError();
  return <div data-testid="message">{message ?? "no-error"}</div>;
};

describe("ErrorProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws if useGlobalError is used outside provider", () => {
    // Suppress expected error logs
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow(
      "useGlobalError must be used inside ErrorProvider"
    );
    spy.mockRestore();
  });

  it("provides default message as null", () => {
    render(
      <ErrorProvider>
        <TestComponent />
      </ErrorProvider>
    );
    expect(screen.getByTestId("message")).toHaveTextContent("no-error");
  });

  it("listens for axios-error events and shows toast", () => {
    render(
      <ErrorProvider>
        <TestComponent />
      </ErrorProvider>
    );

    act(() => {
      const event = new CustomEvent("axios-error", {
        detail: "Something went wrong",
      });
      window.dispatchEvent(event);
    });

    // toast.error should have been called
    expect(toast.error).toHaveBeenCalledWith("Something went wrong");

    // Message should reset back to null
    expect(screen.getByTestId("message")).toHaveTextContent("no-error");
  });

  it("removes event listener on unmount", () => {
    const { unmount } = render(
      <ErrorProvider>
        <TestComponent />
      </ErrorProvider>
    );

    unmount();

    act(() => {
      const event = new CustomEvent("axios-error", {
        detail: "Error after unmount",
      });
      window.dispatchEvent(event);
    });

    // Should NOT call toast after unmount
    expect(toast.error).not.toHaveBeenCalled();
  });
});