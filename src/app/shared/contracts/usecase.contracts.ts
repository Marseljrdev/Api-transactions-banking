import { Result } from "./result.contracts";


export interface Usecase {
    execute: (params?: any) => Promise<Result>;
}