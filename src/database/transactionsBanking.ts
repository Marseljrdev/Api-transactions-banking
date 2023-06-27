import { Transactions, TransactionsType } from "../models/transactions";
import { users } from "./users";


export const transactions: any = [
  new Transactions("Salario", 1800, TransactionsType.Income),
  new Transactions("Salario", 1550, TransactionsType.Outcome),
];
