import { Express } from "express";
import { RouteUsers } from "../utils/Routes";
import { getUser } from "../services/UsersService";
import { verifyToken } from "../services/AuthService";

export function usersController(app: Express) {
  app.route(RouteUsers).get(verifyToken, getUser);
}
