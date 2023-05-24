import { v4 as uuidv4 } from "uuid";

export class Transactions {
  private _id: string;
  constructor(
    private _title: string,
    private _value: number,
    private _type: string
  ) {
    this._id = uuidv4();
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public get value() {
    return this._value;
  }

  public get type() {
    return this._type;
  }

  public toJson() {
    return {
      title: this._title,
      value: this._value,
      type: this._type,
    };
  }
}
