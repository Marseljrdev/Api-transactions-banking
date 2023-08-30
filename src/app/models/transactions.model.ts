import { v4 as uuidv4 } from "uuid";
import { User } from "./user.model";
import { TransactionsEntity } from "../shared/database/entities/transactions.entity";

export enum TransactionsType {
  Income = "I",
  Outcome = "O",
}

export class Transactions {
  private _id: string;
  constructor(
    private _title: string,
    private _value: number,
    private _type: TransactionsType,
    private _user: User
  ) {
    this._id = uuidv4();
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public set setTitle(newTitle: string) {
    this._title = newTitle;
  }

  public get value() {
    return this._value;
  }

  public set setValue(newValue: number) {
    this._value = newValue;
  }

  public get type() {
    return this._type;
  }

  public set setType(newType: TransactionsType) {
    this._type = newType;
  }

  public get user() {
    return this._user;
  }

  // public set setUser(newUser: User) {
  //   this._user = newUser;
  // }

  public toJson() {
    return {
      id: this._id,
      title: this._title,
      value: this._value,
      type: this._type,
      user: this._user?.toJson(),
    };
  }

  public static create(row: TransactionsEntity, user: User) {
    const transaction = new Transactions(
      row.title,
      Number(row.value),
      row.type as TransactionsType,
      user
    );
    transaction._id = row.id;

    return transaction;
  }
}
