import { Database } from "../../../../main/database/database.connection";
import { UserEntity } from "../../../shared/database/entities/user.entity";
import { User } from "../../../models/user.model";

export class UserRepository {

  //padrao datamapper
  private repository = Database.connection.getRepository(UserEntity);

  public async list() {
    const result = await this.repository.find();
    return result.map((entity) => UserRepository.mapRowToModel(entity));
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
  
  public async getByEmail(email: string) {
    const result = await this.repository.findOneBy({
      email,
    });

    if (!result) {
      return undefined;
    }

    const dbUser = result;
    return UserRepository.mapRowToModel(dbUser);
  }

  public async getByCpf(cpf: number) {
    const result = await this.repository.findOneBy({
      cpf
    });

    if(!result){
      return undefined;
    }

    const getCpf = result;
    return UserRepository.mapRowToModel(getCpf);
  }

  public async create(user: User) {
    const createUser = this.repository.create({
      name: user.name,
      cpf: user.cpf,
      email: user.email, 
      age: user.age,
      password: user.password
    });

    const result = await this.repository.save(createUser);
    console.log(result);
  }

  public async update(user: User) {
    const result = await this.repository.update(
      {
        id: user.id,
      }, 
      {
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        age: user.age,
      }
    );

    result.affected ?? 0;
  }

  public async delete(id: string){
    const result = await this.repository.delete({id})

    const resultDel = result.affected ?? 0;
    console.log('Quantidade de registros excluidos', resultDel);
    return resultDel;
  }

  public static mapRowToModel(row: UserEntity): User {
    return User.create(row);
  }
}
