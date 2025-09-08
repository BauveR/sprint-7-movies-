import { render, screen } from "@testing-library/react";

test("smoke test", () => {
  render(<button>Click me</button>);
  expect(screen.getByText(/click me/i)).toBeInTheDocument();
});
