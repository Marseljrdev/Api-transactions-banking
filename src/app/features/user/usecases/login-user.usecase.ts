import { Result } from "../../../shared/contracts/result.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../repositories/user.repository";

interface LoginParams {
    email: string;
    password: string;
}

export class LoginUserUseCase {
    public async execute(params: LoginParams): Promise<Result>{
        const repository = new UserRepository();

        const user = await repository.getByEmail(params.email);
        if (!user) {
        return Response.notFound("User");
        }
  
        if (user.password !== params.password) {
          return Response.invalidCredentials()
        }

        return Response.success("Login successfully", user);
    }
}