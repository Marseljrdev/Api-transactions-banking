import { Result } from "../../../shared/contracts/result.contracts";
import { Usecase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../repositories/user.repository";

interface UpdateParams {
    id: string;
    name?: string;
    cpf?: number;
    email?: string;
    age?: number;
}

export class UpdateUserUseCase implements Usecase {
    public async execute(params: UpdateParams): Promise<Result> {
        const repository = new UserRepository();

        let user = await repository.get(params.id);
  
        if (!user) {
        return Response.notFound("User");
        }
  
        if (params.name) {
          user.setName = params.name;
        }
  
        if (params.cpf) {
          user.setCpf = params.cpf;
        }
  
        if (params.email) {
          user.setEmail = params.email;
        }
  
        if (params.age) {
          user.setAge = params.age;
        }
  
        await repository.update(user);

        return Response.success("User was updated", user);
    }
}