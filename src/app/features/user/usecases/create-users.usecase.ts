import { User } from "../../../models/user.model";
import { Result } from "../../../shared/contracts/result.contracts";
import { Usecase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../repositories/user.repository";

interface CreateParams {
  name: string;
  cpf: number;
  email: string;
  age: number;
  password: string;
}

export class CreateUserUseCase implements Usecase {
  public async execute(params: CreateParams): Promise<Result> {
    const newUser = new User(
      params.name,
      params.cpf,
      params.email,
      params.age,
      params.password
    );
    await new UserRepository().create(newUser);

    return Response.success("User created was successfully", newUser);
  }
}
