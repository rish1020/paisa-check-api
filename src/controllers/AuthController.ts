import { Express } from "express";
import { RouteSignin, RouteSignup } from "../utils/Routes";
import { signIn, signUp } from "../services/AuthService";

export function authController(app: Express) {
  app.route(RouteSignup).post(signUp);
  app.route(RouteSignin).post(signIn);
}
