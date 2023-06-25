import { users } from "../database/users";


export class UserRepository {
    public get(id: string) {
        return users.find((user) => user.id === id);
    }
    public getByEmail(email: string) {
        return users.find((user) => user.email === email);
    }

}