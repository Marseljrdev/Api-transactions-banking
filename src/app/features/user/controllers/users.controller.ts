import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../../../models/user.model";
import { HttpResponse } from "../../../shared/util/htttp-response.adapter";
import { ListUserUseCase } from "../usecases/list-users.usecase";
import { LoginUserUseCase } from "../usecases/login-user.usecase";
import { UpdateUserUseCase } from "../usecases/update-users.usecase";
import { DeleteUserUseCase } from "../usecases/delete-users.usecase";
import { CreateUserUseCase } from "../usecases/create-users.usecase";
import { ObterUserUseCase } from "../usecases/obter-users.usecase";


export class UsersController {
  public async list(req: Request, res: Response) {
    try {
      const usecases = new ListUserUseCase();
      const result = await usecases.execute();

      if (!result) {
        return HttpResponse.notFound(res, "User");
      }

      // return HttpResponse.success200(res, "User list was successfully", result);
      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }

  public async obter(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usecase = new ObterUserUseCase();
      const result = await usecase.execute(id);

      if(!result){
        return HttpResponse.notFound(res, "User");
      }

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
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

      const usecase = new CreateUserUseCase();
      const result = await usecase.execute({
        name,
        cpf,
        email,
        age,
        password,
      });

      return res.status(result.code).send(result);
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
        age,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usecases = new DeleteUserUseCase();
      const result = await usecases.execute(id);

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
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

      const result = await new LoginUserUseCase().execute(req.body);

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }
}
