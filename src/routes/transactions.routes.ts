import { NextFunction, Router, Request, Response } from "express";
import { TransactionsController } from "../controller/transactions.controller";
import { users } from "../database/users";

//Middleware que verifica se o usuario existe
function userAlreadyExists(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  let userId = users.find((item) => item.id === id);

  if (!userId) {
    return res.status(404).send({
      success: false,
      message: "User was not exists",
    });
  }

  next();
}
export const TransactionsRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.get(
    "/users/:id/transactions",
    userAlreadyExists,
    new TransactionsController().list
  );

  app.get(
    "/users/:id/transactions/:transactionId",
    userAlreadyExists,
    new TransactionsController().transaction
  );

  app.post(
    "/users/:id/transactions",
    userAlreadyExists,
    new TransactionsController().create
  );

  return app;
};
