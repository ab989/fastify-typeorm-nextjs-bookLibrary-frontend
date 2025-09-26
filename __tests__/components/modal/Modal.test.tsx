// Modal.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/components/modal/Modal";

describe("Modal", () => {
  const mockOnClose = jest.fn();

  const setup = (props = {}) => {
    return render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" {...props}>
        <p>Modal content</p>
      </Modal>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders content when open", () => {
    setup();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when isOpen=false", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Hidden Modal">
        <p>Should not show</p>
      </Modal>
    );
    expect(screen.queryByText("Should not show")).not.toBeInTheDocument();
  });

  it("renders title when provided", () => {
    setup();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("applies aria-label if no title", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} ariaLabel="Accessible Modal">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Accessible Modal");
  });

  it("calls onClose when close button clicked", () => {
    setup();
    fireEvent.click(screen.getByLabelText("Close dialog"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking backdrop", () => {
    setup();
    const backdrop = document.querySelector(".absolute.inset-0") as HTMLElement;
    fireEvent.mouseDown(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT close on backdrop click if closeOnBackdrop=false", () => {
    setup({ closeOnBackdrop: false });
    const backdrop = document.querySelector(".absolute.inset-0") as HTMLElement;
    fireEvent.mouseDown(backdrop);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", () => {
    setup();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders footer when provided", () => {
    setup({ footer: <button>Save</button> });
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});