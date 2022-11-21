import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Posts from "../src/pages/posts";
import axios from "axios";

jest.mock("axios");

beforeAll(() => {
  axios.get.mockResolvedValue({
    data: [
      {
        userId: 1,
        id: 1,
        title: "titulo 1",
        body: "post 1",
      },
      {
        userId: 1,
        id: 2,
        title: "titulo 2",
        body: "post 2",
      },
    ],
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

test("renderiza posts", async () => {
  render(<Posts />);

  const title = await screen.findByText("titulo 1");
  expect(title).toBeInTheDocument();
  screen.debug();
});
