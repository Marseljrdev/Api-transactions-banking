import {
  Transactions,
  TransactionsType,
} from "../../../models/transactions.model";
import { Result } from "../../../shared/contracts/result.contracts";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Response } from "../../../shared/util/response.adapter";
import { TransactionRepository } from "../repositories/transaction.repository";

interface ListParams {
  userId: string;
  type: TransactionsType;
}

export class LisTransactionUseCase {
  public async execute(params: ListParams): Promise<Result> {
    const cacheRepository = new CacheRepository();
    const cachedTransactions = cacheRepository.get(`transactions-${params.userId}`);

    if (cachedTransactions) {
      return Response.success(
        "Transactions was successfully listed (cache)",
        cachedTransactions
      );
    }

    let result = await new TransactionRepository().list({
      userId: params.userId,
      type: params.type as TransactionsType,
    });

    if (!result) {
      return Response.notFound("User");
    }

    let income = this.sumTransactionsValues(result, TransactionsType.Income);
    let outcome = this.sumTransactionsValues(result, TransactionsType.Outcome);

    const transactions = {
      transactions: result.map((item) => item.toJson()),
      balance: {
        income,
        outcome,
        total: income - outcome,
      },
    };

    const transactionsString = JSON.stringify(transactions)

    await cacheRepository.set(`transactions-${params.userId}`, transactionsString)

    return Response.success(
      "Transactions was successfully listed",
      transactions
    );
  }

  private sumTransactionsValues(
    transactions: Transactions[],
    type: TransactionsType
  ): number {
    return transactions
      .filter((t) => t.type === type)
      .reduce((soma, transaction) => soma + transaction.value, 0);
  }
}
