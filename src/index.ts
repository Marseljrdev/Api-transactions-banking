import express, { NextFunction, Request, Response } from "express";
import { users } from "./database/users";
import { User } from "./models/user";
import { Transactions } from "./models/transactions";
import { transactions } from "./database/transactionsBanking";
import { UsersController } from "./controller/users.controller";
import { TransactionsController } from "./controller/transactions.controller";
import { UsersRoutes } from "./routes/users.routes";
import { TransactionsRoutes } from "./routes/transactions.routes";

const app = express();
app.use(express.json());

app.use("/", UsersRoutes());

//TRANSACTIONS

app.use("/", TransactionsRoutes());

app.listen(3333, () => {
  console.log("Api is running port 3333...");
});
