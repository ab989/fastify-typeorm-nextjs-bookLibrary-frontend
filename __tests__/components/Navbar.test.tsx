import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import "@testing-library/jest-dom";

// Mock next/link to render plain <a> for testing
jest.mock("next/link", () => {
  return ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

describe("Navbar", () => {
  it("renders brand link", () => {
    render(<Navbar />);
    const brand = screen.getByText("Moneturn");
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute("href", "/");
  });

  it("renders Authors link", () => {
    render(<Navbar />);
    const authorsLink = screen.getByText("Authors");
    expect(authorsLink).toBeInTheDocument();
    expect(authorsLink).toHaveAttribute("href", "/authors");
  });

  it("renders Books link", () => {
    render(<Navbar />);
    const booksLink = screen.getByText("Books");
    expect(booksLink).toBeInTheDocument();
    expect(booksLink).toHaveAttribute("href", "/books");
  });

  it("renders all links in navigation bar", () => {
    render(<Navbar />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });
});