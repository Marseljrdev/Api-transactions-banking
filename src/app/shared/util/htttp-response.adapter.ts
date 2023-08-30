import { Response } from "express";

export class HttpResponse {
    public static success200(res: Response, message: string, data: any) {
        return res.status(200).send({
            success: true,
            message,
            data,
        });
    }

    public static created(res: Response, message: string, data: any) {
        return res.status(201).send({
            success: true,
            message,
            data,
        });
    }

    public static fieldNotProvided(res: Response, field: string) {
        return res.status(400).send({
            success: false,
            message: field + " was not provided.",
        });
    }

    public static notFound(res: Response, entity: string) {
        return res.status(404).send({
            success: false,
            message: entity + " not found.",
        });
    }

    public static invalid(res: Response, field: string) {
        return res.status(400).send({
            success: false,
            message: field + " is invalid.",
        });
    }

    public static invalidCredentials(res: Response) {
        return res.status(401).send({
            success: false,
            message: "Acesso não autorizado",
        });
    }

    public static genericError500(res: Response, error: any) {
        return res.status(500).send({
            success: false,
            message: error.toString(),
        });
    }
}