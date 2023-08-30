import { Database } from "../../../../main/database/database.connection";
import { UserEntity } from "../../../shared/database/entities/user.entity";
import { User } from "../../../models/user.model";

export class UserRepository {

  //padrao datamapper
  private repository = Database.connection.getRepository(UserEntity);

  public async list() {
    const result = await this.repository.find();
    return result.map((entity) => UserRepository.mapRowToModel(entity));

    // const result = await this.connection.query(
    //   "select * from transactions.users"
    // );
    // return result;
  }

  public async get(id: string) {
    // const result = await this.repository.find({
    //   where: { id },
    // });

    // const result = await this.repository.findBy({
    //   id,
    // });

    const result = await this.repository.findOneBy({
      id,
    });

    if (!result) {
      return undefined;
    }

    const dbUser = result;
    return UserRepository.mapRowToModel(dbUser);

    // return result.rows
    // return users.find((user) => user.id === id);
  }
  
  // public getByEmail(email: string) {
  //   return users.find((user) => user.email === email);
  // }

  public static mapRowToModel(row: UserEntity): User {
    return User.create(row);
  }
}
