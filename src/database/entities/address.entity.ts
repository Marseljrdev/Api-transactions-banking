import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("address")
export class AddressEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({
    length: 9,
    name: "zip_code",
  })
  zipCode: string;

  @Column()
  city: string;

  //   @Column({
  //     name: "user_id",
  //   })
  //   idUser: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: "user_id",
  })
  user: UserEntity;
}
