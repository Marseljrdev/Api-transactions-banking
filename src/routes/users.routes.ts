import { NextFunction, Router, Request, Response  } from "express";
import { TransactionsController} from "../controller/transactions.controller";
import { UsersController } from "../controller/users.controller";
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
export const UsersRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.get("/users", new UsersController().list);

  app.get("/users/:id", new UsersController().obter);

  app.post("/users", checkingDuplicateCpf, new UsersController().create);

  app.put("/users/:id", new UsersController().update);

  app.delete("/users/:id", new UsersController().delete);

  return app;
};
