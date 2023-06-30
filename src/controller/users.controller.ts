import { Request, Response } from "express";
import { users } from "../database/users";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

export class UsersController {
  public list(req: Request, res: Response) {
    try {
      const { name, email, cpf } = req.query;

      let result = users;

      if (name) {
        result = users.filter((item) => item.name === name);
      }
      if (email) {
        result = users.filter((item) => item.email === email);
      }
      if (cpf) {
        result = users.filter((item) => item.cpf === cpf);
      }

      if (result.length === 0) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Users were successfully",
        data: result.map((user) => user.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public obter(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let result = users.find((item) => item.id === id);

      if (!result) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Users was obted successfully",
        data: result.toJsonOutTransactions(),
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public create(req: Request, res: Response) {
    try {
      const { name, cpf, email, age, password } = req.body;

      if (!name) {
        return res.status(400).send({
          success: false,
          message: "Name was not provided",
        });
      }

      if (!cpf) {
        return res.status(400).send({
          success: false,
          message: "Cpf was not provided",
        });
      }

      if (!email) {
        return res.status(400).send({
          success: false,
          message: "Email was not provided",
        });
      }

      if (!age) {
        return res.status(400).send({
          success: false,
          message: "Age was not provided",
        });
      }

      if (!password) {
        return res.status(400).send({
          success: false,
          message: "password was not provided",
        });
      }

      const newUser = new User(name, cpf, email, age, password);
      users.push(newUser);

      return res.status(201).send({
        success: true,
        message: "User was created",
        data: newUser,
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, cpf, email, age } = req.body;

      let user = users.find((item) => item.id === id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      user.setName = name || user.name;
      user.setCpf = cpf || user.cpf;
      user.setEmail = email || user.email;
      user.setAge = age || user.age;

      return res.status(201).send({
        success: true,
        message: "User updated successfully",
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let index = users.findIndex((item) => item.id === id);

      if (index === -1) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      users.splice(index, 1);

      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(404).send({
          success: false,
          message: "E-mail was not providded",
        });
      }

      if (!password) {
        return res.status(404).send({
          success: false,
          message: "Password was not providded",
        });
      }

      const user = new UserRepository().getByEmail(email);
      console.log('log user', user?.email);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User was not found",
        });
      }

      if (user.password !== password) {
        return res.status(401).send({
          success: false,
          message: "Acesso nao autorizado",
        });
      }

      return res.status(200).send({
        success: true,
        message: "User is logged",
        data: {
          id: user.id,
          email: user.email,
          password: user.password
        }

      })
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: "Error interno no servidor, tente novamente mais tarde",
      });
    }
  }
}
