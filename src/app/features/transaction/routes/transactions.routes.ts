import { NextFunction, Router, Request, Response } from "express";
import { TransactionsController } from "../controllers/transactions.controller";
// import { users } from "../data/users";
import { UserMiddleWare } from "../../user/validators/user.middleware";
import { TransactionsMiddleware } from "../validators/transactions.middleware";

export const TransactionsRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  const controller = new TransactionsController();

  // app.get("/users/:id/transactions", (req: Request, res: Response) =>
  //   controller.list(req, res)
  // );

  // app.get(
  //   "/users/:id/transactions/:transactionId",
  //   [UserMiddleWare.validateUserExists],
  //   new TransactionsController().transaction
  // );

  app.post(
    "/users/:id/transactions",
    [
      UserMiddleWare.validateUserExists,
      TransactionsMiddleware.validateFieldCreate,
    ],
    new TransactionsController().create
  );

  app.delete(
    "/users/:userId/transactions/:transactionId",
    new TransactionsController().delete
  );

  app.put(
    "/users/:userId/transactions/:transactionId",
    new TransactionsController().update
  );

  return app;
};
