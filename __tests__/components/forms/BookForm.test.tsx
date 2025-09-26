import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookForm, { BookFormValues } from "@/components/forms/BookForm";
import { Author } from "@/types/Author";

describe("BookForm", () => {
  const authors: Author[] = [
    { id: "1", name: "Author 1" },
    { id: "2", name: "Author 2" },
  ];

  const defaultValues: BookFormValues = { title: "My Book", authorId: "1" };

  const setup = (props = {}) => {
    const onSubmit = jest.fn();
    render(<BookForm onSubmit={onSubmit} authors={authors} {...props} />);
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const authorSelect = screen.getByLabelText(/author/i) as HTMLSelectElement;
    const button = screen.getByRole("button");
    return { titleInput, authorSelect, button, onSubmit };
  };

  it("renders with default empty values", () => {
    const { titleInput, authorSelect, button } = setup({ initialValues: undefined });
    expect(titleInput.value).toBe("");
    expect(authorSelect.value).toBe("");
    expect(button).toHaveTextContent("Save");
  });

  it("renders with initialValues", () => {
    const { titleInput, authorSelect } = setup({ initialValues: defaultValues });
    expect(titleInput.value).toBe("My Book");
    expect(authorSelect.value).toBe("1");
  });

  it("updates input and select values on change", () => {
    const { titleInput, authorSelect } = setup();
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(authorSelect, { target: { value: "2" } });
    expect(titleInput.value).toBe("New Title");
    expect(authorSelect.value).toBe("2");
  });

  it("shows validation errors when submitted with empty fields", () => {
    const { titleInput, authorSelect, button } = setup();
    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.change(authorSelect, { target: { value: "" } });
    fireEvent.click(button);
    expect(screen.getByText("Book title is required.")).toBeInTheDocument();
    expect(screen.getByText("Please select an author.")).toBeInTheDocument();
  });

  it("calls onSubmit with correct values when valid", () => {
    const { titleInput, authorSelect, button, onSubmit } = setup();
    fireEvent.change(titleInput, { target: { value: "New Book" } });
    fireEvent.change(authorSelect, { target: { value: "2" } });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ title: "New Book", authorId: "2" });
    expect(screen.queryByText("Book title is required.")).toBeNull();
    expect(screen.queryByText("Please select an author.")).toBeNull();
  });

  it("renders custom submitLabel", () => {
    const { button } = setup({ submitLabel: "Add Book" });
    expect(button).toHaveTextContent("Add Book");
  });

  it("renders dropdown with correct options", () => {
    setup();
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(authors.length + 1); // +1 for "Select an author"
    expect(options[0].textContent).toBe("Select an author");
    expect(options[1].textContent).toBe("Author 1");
    expect(options[2].textContent).toBe("Author 2");
  });
});