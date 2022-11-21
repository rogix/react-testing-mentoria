import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createRoot } from "react-dom/client";
import userEvent from "@testing-library/user-event";

import Counter from "./Counter";
import { act } from "react-dom/test-utils";

test("contador aumenta ou diminui quando o usuário clica nos botões", async () => {
  const { container } = render(<Counter />);

  const decrement = screen.getByRole("button", { name: /decrement/i });
  const increment = screen.getByRole("button", { name: /increment/i });

  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent("Current count: 0");
  await userEvent.click(increment);
  expect(message).toHaveTextContent("Current count: 1");
  await userEvent.click(decrement);
  expect(message).toHaveTextContent("Current count: 0");
});
