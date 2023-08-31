import { Result } from "../../../shared/contracts/result.contracts";
import { UserRepository } from "../repositories/user.repository";

export class ListUserUseCase {
    public async execute(): Promise<Result>{
        const repository = new UserRepository();

        const result = await repository.list();

        return {
            success: true,
            message: "Users listed was successfully",
            data: result,
            code: 200
        };
    }
}