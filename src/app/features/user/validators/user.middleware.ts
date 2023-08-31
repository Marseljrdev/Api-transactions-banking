import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";
import { HttpResponse } from "../../../shared/util/htttp-response.adapter";

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

  public static async checkingDuplicateCpf(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { cpf } = req.body;

      const repository = new UserRepository()
      const findCpf = await repository.getByCpf(cpf);

      if (findCpf) {
        return HttpResponse.invalid(res, "cpf already exists")
      }

      next();
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }
}
