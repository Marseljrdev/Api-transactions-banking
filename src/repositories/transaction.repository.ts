import { transactions } from "../database/transactionsBanking";
import { Transactions, TransactionsType } from "../models/transactions";

export class TransactionRepository {
  public create(transaction: Transactions) {
    return transactions.push(transaction);
  }
}
