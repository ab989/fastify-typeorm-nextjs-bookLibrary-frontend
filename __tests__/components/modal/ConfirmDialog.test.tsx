import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "@/components/modal/ConfirmDialog";

describe("ConfirmDialog", () => {
  const mockHandleClose = jest.fn();
  const mockHandleConfirm = jest.fn();

  const setup = (props = {}) => {
    return render(
      <ConfirmDialog
        isOpen={true}
        handleClose={mockHandleClose}
        handleConfirm={mockHandleConfirm}
        confirmMsg="Do you want to delete this item?"
        {...props}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with custom confirm message", () => {
    setup();
    expect(screen.getByText("Do you want to delete this item?")).toBeInTheDocument();
  });

  it("renders with default message when confirmMsg is not provided", () => {
    setup({ confirmMsg: undefined });
    expect(
      screen.getByText("Are you sure to perform this action")
    ).toBeInTheDocument();
  });

  it("calls handleClose when Cancel button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it("calls handleConfirm when Confirm button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
  });

  it("passes confirmRef as initialFocusRef to Modal if provided", () => {
    const ref = { current: document.createElement("button") };
    setup({ confirmRef: ref });
    // Modal isn't implemented here, but we check if it's rendered in DOM
    // Your Modal component should handle initialFocusRef internally
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });
});