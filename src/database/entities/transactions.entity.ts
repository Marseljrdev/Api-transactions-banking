import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TransactionsType } from "../../models/transactions";
import { UserEntity } from "./user.entity";

@Entity("transactions")
export class TransactionsEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column({
    length: 60,
    nullable: true
  })
  estabelecimento: string;

  @Column({
    enum: TransactionsType,
  })
  type: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "update_at",
  })
  updateAt: Date;

  @Column({
    name: "user_id",
  })
  idUser: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "user_id",
  })
  user: UserEntity;
}
