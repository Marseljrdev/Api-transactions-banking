import { Result } from "../../../shared/contracts/result.contracts";
import { Usecase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../repositories/user.repository";

export class DeleteUserUseCase implements Usecase {
    public async execute(id: string): Promise<Result>{

        const repository = new UserRepository();
        const result = repository.get(id);
        
        if(!result){
            return Response.notFound("User");
        }

        await repository.delete(id);
        return Response.success("Usuario deletado com sucesso", result);

    }
}