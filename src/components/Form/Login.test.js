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

test("enviar formulário com senha e nome", async () => {});

test("mostrar nome do usuário quando logar", async () => {});

test("omitir senha gera um erro", async () => {});
