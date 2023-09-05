import { Result } from "../../../shared/contracts/result.contracts";
import { Usecase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../repositories/user.repository";


export class ObterUserUseCase implements Usecase {
    public async execute(id: string): Promise <Result> {
        const repository = new UserRepository();

        const result = await repository.get(id);
  
        if (!result) {
          return Response.notFound("user");
        }

        return Response.success("User was listed successfully", result);

    }
}