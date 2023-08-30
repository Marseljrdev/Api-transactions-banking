import express, { Express } from "express";
import cors from "cors";
import { TransactionsRoutes } from "../../routes/transactions.routes";
import { UsersRoutes } from "../../routes/users.routes";
import * as dotenv from "dotenv";
dotenv.config();

export class Server {
  public static create() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    //USERS

    app.use("/", UsersRoutes());

    //TRANSACTIONS

    app.use("/", TransactionsRoutes());
    return app;
  }

  public static listen(app: Express) {
    app.listen(process.env.PORT, () => {
      console.log("Api is running port " + process.env.PORT);
    });
  }
}
