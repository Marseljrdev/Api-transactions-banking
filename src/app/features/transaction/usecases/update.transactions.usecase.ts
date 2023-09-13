import { TransactionsType } from "../../../models/transactions.model";
import { Result } from "../../../shared/contracts/result.contracts";
import { Usecase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";


interface UpdateTransactionParams {
    userId: string, 
    transactionId: string,
    type: TransactionsType, 
    value:  number
}

export class UpdateTransactionUseCase implements Usecase {
    public async execute(params: UpdateTransactionParams): Promise<Result> {

        const user = await new UserRepository().get(params.userId);

        if (!user) {
          return Response.notFound("User")
        }
  
        const transactionRepository = new TransactionRepository();
        const transaction = await transactionRepository.get(params.transactionId);
  
        if (!transaction) {
          return Response.notFound("Transaction")
        }
  
        if (params.type) {
          transaction.setType = params.type as TransactionsType;
        }
  
        if (params.value) {
          transaction.setValue = params.value;
        }
  
        await transactionRepository.update(transaction);
  
        const transactions = await transactionRepository.list({
          userId: params.userId,
        });
        
        return Response.success("Transactions was successfully updated", transactions);
        
    }
}