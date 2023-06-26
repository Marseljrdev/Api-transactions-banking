import express from "express";
import { UsersRoutes } from "./routes/users.routes";
import { TransactionsRoutes } from "./routes/transactions.routes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//USERS

app.use("/", UsersRoutes());

//TRANSACTIONS

app.use("/", TransactionsRoutes());

app.listen(process.env.PORT, () => {
  console.log("Api is running port " + process.env.PORT);
});
function cors(): any {
  throw new Error("Function not implemented.");
}
