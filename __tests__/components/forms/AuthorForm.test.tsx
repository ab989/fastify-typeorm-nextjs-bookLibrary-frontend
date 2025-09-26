import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthorForm, { AuthorFormValues } from "@/components/forms/AuthorForm";

describe("AuthorForm", () => {
  const defaultValues: AuthorFormValues = { name: "John Doe" };
  const setup = (props = {}) => {
    const onSubmit = jest.fn();
    render(<AuthorForm onSubmit={onSubmit} {...props} />);
    const input = screen.getByLabelText(/name/i) as HTMLInputElement;
    const button = screen.getByRole("button");
    return { input, button, onSubmit };
  };

  it("renders with default empty value", () => {
    const { input, button } = setup();
    expect(input.value).toBe("");
    expect(button).toHaveTextContent("Save");
  });

  it("renders with initialValues", () => {
    const { input } = setup({ initialValues: defaultValues });
    expect(input.value).toBe("John Doe");
  });

  it("updates value on change", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "Jane Doe" } });
    expect(input.value).toBe("Jane Doe");
  });

  it("shows error if submitted with empty name", () => {
    const { button } = setup();
    fireEvent.click(button);
    expect(screen.getByText("Author name is required.")).toBeInTheDocument();
  });

  it("calls onSubmit with correct values when valid", () => {
    const { input, button, onSubmit } = setup();
    fireEvent.change(input, { target: { value: "Alice" } });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ name: "Alice" });
    // Error message should not be shown
    expect(screen.queryByText("Author name is required.")).toBeNull();
  });

  it("uses custom submitLabel", () => {
    const { button } = setup({ submitLabel: "Update Author" });
    expect(button).toHaveTextContent("Update Author");
  });

});