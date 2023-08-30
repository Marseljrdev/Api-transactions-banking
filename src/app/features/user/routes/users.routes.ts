import { NextFunction, Router, Request, Response } from "express";
import { UsersController } from "../controllers/users.controller";
import { UserMiddleWare } from "../validators/user.middleware";

export const UsersRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.get("/users", new UsersController().list);

  app.get("/users/:id", new UsersController().obter);

  // app.post(
  //   "/users",
  //   [UserMiddleWare.checkingDuplicateCpf],
  //   new UsersController().create
  // );

  // app.put("/users/:id", new UsersController().update);

  // app.delete("/users/:id", new UsersController().delete);

  // app.post("/users/login", new UsersController().login);

  return app;
};
