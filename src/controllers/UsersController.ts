import { Express } from "express";
import { RouteUsers } from "../utils/Routes";
import { createUser, getUser } from "../services/UsersService";

export function usersController(app: Express) {
  app.route(RouteUsers).get(getUser).post(createUser);
}
