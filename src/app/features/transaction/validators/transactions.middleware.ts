import { Request, Response, NextFunction } from "express";

export class TransactionsMiddleware {
  public static validateFieldCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, value, type } = req.body;

      if (!title) {
        return res.status(400).send({
          success: false,
          message: "Title was not providded",
        });
      }
      if (!value) {
        return res.status(400).send({
          success: false,
          message: "Value was not providded",
        });
      }
      if (!type) {
        return res.status(400).send({
          success: false,
          message: "Type was not providded",
        });
      }

      next();
      
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: "Error interno no servidor, tente novamente mais tarde",
      });
    }
  }
}
