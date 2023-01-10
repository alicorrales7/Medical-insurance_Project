import express, { Application, Request, Response } from "express";
import { check } from "express-validator";
import Container from "typedi";

import { AuthController } from "../controllers/authController";
import { valitor } from "../middlewares/validator-jwt";

export const authRoute = (app: Application): void => {
  app.use(express.json());

  const autController = Container.get(AuthController);

  //Para usar el validador check lo tienes que instalar.... npm install express-validator
  app.post(
    "/login",
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    (req: Request, res: Response) => {
      autController.login(req, res);
    }
  );

  app.post("/renew", valitor, (req: Request, res: Response) => {
    autController.renewToken(req, res);
  });
};
