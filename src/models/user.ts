import { v4 as uuidv4 } from "uuid";
import { Transactions } from "./transactions";

export class User {
  private _id: string;
  constructor(
    private _name: string,
    private _cpf: string,
    private _email: string,
    private _age: number,
    private _transactions?: Transactions[]
  ) {
    this._id = uuidv4();
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public set setName(newName: string) {
    this._name = newName;
  }

  public get cpf() {
    return this._cpf;
  }

  public set setCpf(newCpf: string) {
    this._cpf = newCpf;
  }

  public get email() {
    return this._email;
  }

  public set setEmail(newEmail: string) {
    this._email = newEmail;
  }

  public get age() {
    return this._age;
  }

  public set setAge(newAge: number) {
    this._age = newAge;
  }

  public get transactions() {
    return this._transactions;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      age: this._age,
      transactions: this._transactions,
    };
  }
  public toJsonOutTransactions() {
    return {
      id: this._id,
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      age: this._age,
    };
  }
}
