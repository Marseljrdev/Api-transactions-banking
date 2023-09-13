import { Result } from "../../../shared/contracts/result.contracts";
import { Usecase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

interface ListTransactionsUserParams {
  id: string;
  transactionId: string;
}

export class ListUserTransactionsUseCase implements Usecase {
  public async execute(params: ListTransactionsUserParams): Promise<Result> {
    const repositoryUser = new UserRepository();

    const user = await repositoryUser.get(params.id);

    if (!user) {
      return Response.notFound("User");
    }

    const repositoryTransaction = new TransactionRepository();
    const transactionFind = await repositoryTransaction.get(params.transactionId);

    if (!transactionFind) {
      return Response.notFound("Transaction");
    }

    const userTojson = user.transactions?.map((item) => item.toJson());

    return Response.success("Transactions was successfully", userTojson);
  }
}
