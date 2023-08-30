import { Request, Response, NextFunction } from "express";
import { users } from "../../../../data/users";
import { UserRepository } from "../repositories/user.repository";

export class UserMiddleWare {
  public static async validateUserExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const user = await new UserRepository().get(id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User was not providded",
        });
      }

      next();
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: "Error interno no servidor, tente novamente mais tarde",
      });
    }
  }

  public static checkingDuplicateCpf(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { cpf } = req.body;

      const findCpf = users.find((item) => item.cpf === cpf);

      if (findCpf) {
        return res.status(400).send({
          success: false,
          message: "Cpf already exists",
        });
      }

      next();
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: "Error interno no servidor, tente novamente mais tarde",
      });
    }
  }
}
