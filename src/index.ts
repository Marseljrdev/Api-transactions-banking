import express from "express";
import { UsersRoutes } from "./routes/users.routes";
import { TransactionsRoutes } from "./routes/transactions.routes";

const app = express();
app.use(express.json());

//USERS

app.use("/", UsersRoutes());

//TRANSACTIONS

app.use("/", TransactionsRoutes());

app.listen(3333, () => {
  console.log("Api is running port 3333...");
});
