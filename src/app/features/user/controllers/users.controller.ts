import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../../../models/user.model";
import { HttpResponse } from "../../../shared/util/htttp-response.adapter";
import { ListUserUseCase } from "../usecases/list-users.usecase";
import { LoginUserUseCase } from "../usecases/login-user.usecase";
import { UpdateUserUseCase } from "../usecases/update-users.usecase";

export class UsersController {
  public async list(req: Request, res: Response) {
    try {

      const usecases = new ListUserUseCase();
      const result = await usecases.execute();

      if (!result) {
        return HttpResponse.notFound(res, "User");
      }

      // return HttpResponse.success200(res, "User list was successfully", result);
      return res.status(result.code).send(result)
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }

  public async obter(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = new UserRepository();

      const result = await repository.get(id);

      if (!result) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Users was obted successfully",
        data: result.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, cpf, email, age, password } = req.body;

      if (!name) {
        return HttpResponse.fieldNotProvided(res, "name");
      }

      if (!cpf) {
        return HttpResponse.fieldNotProvided(res, "cpf");
      }

      if (!email) {
        return HttpResponse.fieldNotProvided(res, "email");
      }

      if (!age) {
        return HttpResponse.fieldNotProvided(res, "age");
      }

      if (!password) {
        return HttpResponse.fieldNotProvided(res, "password");
      }

      const newUser = new User(name, cpf, email, age, password);
      await new UserRepository().create(newUser);

      return HttpResponse.created(res, "User was created", newUser);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, cpf, email, age } = req.body;

      const usecases = new UpdateUserUseCase();
      const result = await usecases.execute({
        id,
        name,
        cpf,
        email,
        age
      })

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = new UserRepository();

      let index = await repository.get(id);

      if (!index) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      const result = await repository.delete(id);

      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return HttpResponse.notFound(res, "Email");
      }

      if (!password) {
        return HttpResponse.notFound(res, "Password");
      }

      const result = await new LoginUserUseCase().execute(req.body)

 
      return res.status(result.code).send(result)
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }
}
