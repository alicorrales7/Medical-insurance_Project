import express, { Application } from "express";
import Container from "typedi";

import UserController from "../controllers/userController";
import { valitor } from "../middlewares/validator-jwt";

export const userRoute = (app: Application): void => {
  app.use(express.json());

  const userController = Container.get(UserController);

  app.get("/user", valitor, (req, res) => {
    const find = userController.getAllUsers(res);
    console.log(find);
  });

  app.get("/user/:id", valitor, (req, res) => {
    const findOne = userController.getUser(req, res);
  });

  app.post("/user", valitor, (req, res) => {
    const insert = userController.createUser(req, res);
  });

  app.put("/user/:id", valitor, (req, res) => {
    const update = userController.updateUser(req, res);
    console.log("Edit Successful");
  });

  app.delete("/user/:id", valitor, (req, res) => {
    const deleteUser = userController.deleteUser(req, res);
    console.log("Delete Successful");
  });
};
