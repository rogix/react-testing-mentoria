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
  rest.post(
    "https://auth-provider.example.com/api/login",
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({ message: "password required" }));
      }
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({ message: "username required" }));
      }
      return res(ctx.json({ username: req.body.username }));
    }
  )
);

function buildLoginForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("enviar formulário com senha e nome", async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  const { username, password } = buildLoginForm();

  await userEvent.type(
    screen.getByRole("textbox", { name: /username/i }),
    username
  );
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });

  expect(handleSubmit).toBeCalledTimes(1);
});

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

test("omitir senha gera um erro", async () => {
  render(<Login />);
  const { username } = buildLoginForm();

  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert")).toHaveTextContent("password required");
});
