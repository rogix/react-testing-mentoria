import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "whatwg-fetch";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import LoginForm from "./Login";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Login from "../../pages/login";
import { handlers } from "../../../mocks/handlers";

const server = setupServer(
  rest.post("https://auth-provider.example.com/api/login", (req, res, ctx) => {
    return res(ctx.json({ username: req.body.username }));
  })
);

beforeAll(() => server.listen());

test("enviar formulário com senha e nome", async () => {});

test("mostrar nome do usuário quando logar", async () => {
  render(<Login />);

  const username = "name";
  const password = "pass";

  await userEvent.type(
    screen.getByRole("textbox", { name: /username/i }),
    username
  );
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});

test("omitir senha gera um erro", async () => {});
