import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { TransactionsEntity } from "./transactions.entity";

@Entity("users")
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: number;

  @Column()
  age: number;

  @Column({
    name: "created_at",
  })
  createdAt: Date;

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.user)
  transactions: TransactionsEntity[];
}
