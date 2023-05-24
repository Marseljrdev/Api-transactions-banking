import { NextFunction, Router, Request, Response } from "express";
import { TransactionsController } from "../controller/transactions.controller";
import { users } from "../database/users";

//Middleware que verifica se o cpf ja existe
function checkingDuplicateCpf(req: Request, res: Response, next: NextFunction) {
  const { cpf } = req.body;

  let result = users.find((item) => item.cpf === cpf);

  if (result) {
    return res.status(400).send({
      success: false,
      message: "Cpf already exists",
    });
  }

  next();
}
export const TransactionsRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.get("/users/:id/transactions", new TransactionsController().list);

  app.get(
    "/users/:id/transactions/:transactionId",
    new TransactionsController().transaction
  );

  app.post("/users/:id/transactions", new TransactionsController().create);

  return app;
};
