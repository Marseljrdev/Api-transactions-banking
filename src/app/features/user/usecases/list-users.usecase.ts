import { Result } from "../../../shared/contracts/result.contracts";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class ListUserUseCase {
    public async execute(): Promise<Result> {

        const cacheRepository = new CacheRepository();
        const cachedUsers = await cacheRepository.get("users");

        if (cachedUsers) {
            return {
                success: true,
                message: "Users listed was successfully (cache)",
                data: JSON.parse(cachedUsers),
                code: 200
            }
        }

        const repository = new UserRepository();
        const result = await repository.list();

        const serializedResult = JSON.stringify(result);

        await cacheRepository.set("users", serializedResult);

        return {
            success: true,
            message: "Users listed was successfully",
            data: result.map((item) => item.toJson()),
            code: 200
        };
    }
}