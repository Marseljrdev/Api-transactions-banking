import { TransactionsEntity } from "../../../shared/database/entities/transactions.entity";
import { Database } from "../../../../main/database/database.connection";
import { Transactions, TransactionsType } from "../../../models/transactions.model";
import { User } from "../../../models/user.model";
import { UserRepository } from "../../user/repositories/user.repository";

interface ListTransactionsParams {
  userId: string;
  type?: TransactionsType;
}

export class TransactionRepository {
  private repository = Database.connection.getRepository(TransactionsEntity);

  public async list(params: ListTransactionsParams) {
    const result = await this.repository.find({
      where: {
        idUser: params.userId,
        type: params.type,
      },
      relations: {
        user: true,
      },
      //relations: ["user"]
    });

    return result.map((row) => this.mapRowToModel(row));
  }

  public async create(transaction: Transactions) {
    const transactionEntity = this.repository.create({
      id: transaction.id,
      title: transaction.title,
      value: transaction.value,
      type: transaction.type,
      idUser: transaction.user.id,
    });

    const result = await this.repository.save(transactionEntity);
    console.log(result);
  }

  public async delete(id: string) {
    const result = await this.repository.delete({ id });

    return result.affected ?? 0;
  }

  public async get(id: string) {
    const result = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!result) {
      return undefined;
    }

    return this.mapRowToModel(result);
  }

  public async update(transaction: Transactions) {
    const result = await this.repository.update(
      {
        id: transaction.id,
      },
      {
        type: transaction.setType,
        value: transaction.setValue,
      }
    );

    result.affected ?? 0;
  }

  private mapRowToModel(row: TransactionsEntity) {
    console.log(row);
    const user = UserRepository.mapRowToModel(row.user);
    // const user = new User("name", 1561531, "email@email.com", 1542, "ma123");
    return Transactions.create(row, user);
  }
}
