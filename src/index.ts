import express, { NextFunction, Request, Response } from "express";
import { users } from "./database/users";
import { User } from "./models/user";
import { Transactions } from "./models/transactions";
import { transactions } from "./database/transactionsBanking";
import { UsersController } from "./controller/users.controller";
import { TransactionsController } from "./controller/transactions.controller";

const app = express();
app.use(express.json());

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

app.get("/users", new UsersController().list);

app.get("/users/:id", new UsersController().obter);

app.post("/users", checkingDuplicateCpf, new UsersController().create);

app.put("/users/:id", new UsersController().update);

app.delete("/users/:id", new UsersController().delete);

//TRANSACTIONS

app.get("/users/:id/transactions", new TransactionsController().list);

app.get("/users/:id/transactions/:transactionId", new TransactionsController().transaction);

app.post("/users/:id/transactions", new TransactionsController().create);

app.listen(3333, () => {
  console.log("Api is running port 3333...");
});
