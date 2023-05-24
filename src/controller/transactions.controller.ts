import { Request, Response } from "express";
import { users } from "../database/users";
import { Transactions } from "../models/transactions";
import { transactions } from "../database/transactionsBanking";

export class TransactionsController {
  public list(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let result = users.find((item) => item.id === id);

      if (!result) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Transactions was successfully listed",
        data: result.transactions?.map((item) => item.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public create(req: Request, res: Response) {
    try {
      const { title, value, type } = req.body;

      const { id } = req.params;
      const user = users.find((item) => item.id === id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found ",
        });
      }

      const newTransactions = new Transactions(title, value, type);
      user.transactions?.push(newTransactions);

      return res.status(200).send({
        success: true,
        message: "Transactions added successfully",
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public transaction(req: Request, res: Response) {
    try {
      const { id, transactionId } = req.params;

      const user = users.find((item) => item.id === id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User was not found",
        });
      }

      const transactionFind = transactions.find(
        (item) => item.id === transactionId
      );

      if (!transactionFind) {
        return res.status(404).send({
          success: false,
          message: "Transaction was not found",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Transactions was successfully",
        data: user.transactions?.map((item) => item.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }
}