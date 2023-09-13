import { Result } from "../../../shared/contracts/result.contracts";
import { Usecase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

interface DeleteTransactionParams {
    userId: string,
    transactionId: string
}

export class DeleTransactionUseCase implements Usecase{
    public async execute(params: DeleteTransactionParams): Promise<Result> {

        const user = await new UserRepository().get(params.userId);

      if (!user) {
        return Response.notFound("User")
      }

      const transactionRepository = new TransactionRepository();
      const delectedTransactions = await transactionRepository.delete(
        params.transactionId
      );

      if (delectedTransactions === 0) {
        return Response.notFound("Transaction")
      }

      const transactions = await transactionRepository.list({
        userId: params.userId,
      });

      return Response.success("Transaction deleted successfully", transactions)
    }
}