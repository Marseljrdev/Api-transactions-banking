import { Request, Response } from "express";
import {
  Transactions,
  TransactionsType,
} from "../../../models/transactions.model";
import { HttpResponse } from "../../../shared/util/htttp-response.adapter";
import { LisTransactionUseCase } from "../usecases/list-transactions.usecase";
import { CreateTransactionUseCase } from "../usecases/create-transactions.usecase";
import { ListUserTransactionsUseCase } from "../usecases/listuser-transactions.usecase";
import { DeleTransactionUseCase } from "../usecases/delete-transactions.usecase";
import { UpdateTransactionParams, UpdateTransactionUseCase } from "../usecases/update.transactions.usecase";

export class TransactionsController {
  public async list(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { type } = req.query;

      const usecase = new LisTransactionUseCase();

      const result = await usecase.execute({
        userId,
        type: type as TransactionsType,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { title, value, type } = req.body;

      const { id } = req.params;

      const usecase = new CreateTransactionUseCase();

      const result = await usecase.execute({
        title,
        value,
        type,
        id,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, "error" + error);
    }
  }

  public async transaction(req: Request, res: Response) {
    try {
      const { id, transactionId } = req.params;

      const usecase = new ListUserTransactionsUseCase();
      const result = await usecase.execute({
        id,
        transactionId,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;

      const usecase = new DeleTransactionUseCase();
      const result = await usecase.execute({
        userId,
        transactionId,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return HttpResponse.genericError500(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;
      const { type, value } = req.body;

      const updateParams: UpdateTransactionParams = {
        userId,
        transactionId,
        type,
        value,
    };

    const usecase = new UpdateTransactionUseCase();
    const result = await usecase.execute(updateParams);

      return res.status(result.code).send(result);
    } catch (error) {
      return HttpResponse.genericError500(res, "Erro interno");
    }
  }
}
