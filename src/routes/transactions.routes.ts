import { NextFunction, Router, Request, Response } from "express";
import { TransactionsController } from "../controller/transactions.controller";
import { users } from "../database/users";
import { UserMiddleWare } from "../middlewares/user.middleware";
import { TransactionsMiddleware } from "../middlewares/transactions.middleware";

export const TransactionsRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  const controller = new TransactionsController();

  app.get("/users/:id/transactions", (req: Request, res: Response) => controller.list(req, res));

  app.get(
    "/users/:id/transactions/:transactionId",
    [UserMiddleWare.validateUserExists],
    new TransactionsController().transaction
  );

  app.post(
    "/users/:id/transactions",
    [
      UserMiddleWare.validateUserExists,
      TransactionsMiddleware.validateFieldCreate,
    ],
    new TransactionsController().create
  );

  return app;
};
