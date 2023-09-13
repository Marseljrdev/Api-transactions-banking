import {
  Transactions,
  TransactionsType,
} from "../../../models/transactions.model";
import { Result } from "../../../shared/contracts/result.contracts";
import { Usecase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/util/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

interface CreateParams {
  title: string;
  value: number;
  type: TransactionsType;
  id: string;
}

export class CreateTransactionUseCase implements Usecase {
  public async execute(params: CreateParams): Promise<Result> {
    const userFind = await new UserRepository().get(params.id);

    if (!userFind) {
      return Response.notFound("User");
    }

    const newTransactions = new Transactions(
      params.title,
      params.value,
      params.type,
      userFind
    );
    await new TransactionRepository().create(newTransactions);

    return Response.success(
      "Transactions was created successfully",
      newTransactions.toJson()
    );
  }
}
