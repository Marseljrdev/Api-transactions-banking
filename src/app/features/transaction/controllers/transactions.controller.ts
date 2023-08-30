import { Request, Response } from "express";
import { Transactions, TransactionsType } from "../../../models/transactions.model";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { HttpResponse } from "../../../shared/util/htttp-response.adapter";

export class TransactionsController {
  // public async list(req: Request, res: Response) {
  //   try {
  //     const { userId } = req.params;
  //     const { type } = req.query;

  //     let result = await new TransactionRepository().list({
  //       userId: userId,
  //       type: type as TransactionsType,
  //     });

  //     if (!result) {
  //       return res.status(404).send({
  //         success: false,
  //         message: "User not found",
  //       });
  //     }

  //     let income = this.sumTransactionsValues(
  //       transactions,
  //       TransactionsType.Income
  //     );
  //     let outcome = this.sumTransactionsValues(
  //       transactions,
  //       TransactionsType.Outcome
  //     );

  //     return res.status(200).send({
  //       success: true,
  //       message: "Transactions was successfully listed",
  //       data: result.map((item) => item.toJson()),
  //       balance: {
  //         income,
  //         outcome,
  //         total: income - outcome,
  //       },
  //     });
  //   } catch (error: any) {
  //     return res.status(500).send({
  //       success: false,
  //       message: error.toString(),
  //     });
  //   }
  // }

  public async create(req: Request, res: Response) {
    try {
      const { title, value, type } = req.body;

      const { id } = req.params;
      // const userFind = users.find((item) => item.id === id);

      const userFind = await new UserRepository().get(id);

      if (!userFind) {
        return res.status(404).send({
          success: false,
          message: "User not found ",
        });
      }

      const newTransactions = new Transactions(title, value, type, userFind);
      await new TransactionRepository().create(newTransactions);

      return HttpResponse.success200(
        res,
        "Transactions added successfully",
        newTransactions.toJson()
      );
    } catch (error: any) {
      return HttpResponse.genericError500(res, "error" + error);
    }
  }

  // public transaction(req: Request, res: Response) {
  //   try {
  //     const { id, transactionId } = req.params;

  //     const user = users.find((item) => item.id === id);

  //     if (!user) {
  //       return res.status(404).send({
  //         success: false,
  //         message: "User was not found",
  //       });
  //     }

  //     const transactionFind = transactions.find(
  //       (item: any) => item.id === transactionId
  //     );

  //     if (!transactionFind) {
  //       return res.status(404).send({
  //         success: false,
  //         message: "Transaction was not found",
  //       });
  //     }

  //     return res.status(200).send({
  //       success: true,
  //       message: "Transactions was successfully",
  //       data: user.transactions?.map((item) => item.toJson()),
  //     });
  //   } catch (error: any) {
  //     return res.status(500).send({
  //       success: false,
  //       message: error.toString(),
  //     });
  //   }
  // }

  public async delete(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;

      const user = await new UserRepository().get(userId);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Usuario não encontrado.",
        });
      }

      const transactionRepository = new TransactionRepository();
      const delectedTransactions = await transactionRepository.delete(
        transactionId
      );

      if (delectedTransactions === 0) {
        return res.status(404).send({
          success: false,
          message: "Transação inexistente",
        });
      }

      const transactions = await transactionRepository.list({
        userId,
      });

      return res.status(200).send({
        success: true,
        message: "Transação deletada com sucesso",
        data: transactions.map((t) => t.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: "Erro interno no servidor",
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;
      const { type, value } = req.body;

      const user = await new UserRepository().get(userId);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User was not found",
        });
      }

      const transactionRepository = new TransactionRepository();
      const transaction = await transactionRepository.get(transactionId);

      if (!transaction) {
        return res.status(404).send({
          success: false,
          message: "Transaction was not found",
        });
      }

      if (type) {
        transaction.setType = type as TransactionsType;
      }

      if (value) {
        transaction.setValue = value;
      }

      await transactionRepository.update(transaction);

      const transactions = await transactionRepository.list({
        userId,
      });

      return HttpResponse.success200(
        res,
        "Transactions was successfully update",
        transactions.map((item) => item.toJson())
      );
    } catch (error) {
      return HttpResponse.genericError500(res, "Erro interno");
    }
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
