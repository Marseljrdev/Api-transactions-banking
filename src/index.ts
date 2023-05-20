import express, { NextFunction, Request, Response } from "express";
import { users } from "./database/users";
import { User } from "./models/user";

const app = express();
app.use(express.json());

//Middleware que verifica se o cpf ja existe
function checkingDuplicateCpf(req: Request, res: Response, next: NextFunction) {
  const { cpf } = req.body;

  let result = users.find((item) => item.cpf === cpf);

  if (result) {
    return res.status(400).send({
      success: false,
      message: "Cpf already exists",
    });
  }

  next();
}

//GET/USERS
//GET http://localhost:3333/users?query=value
app.get("/users", (req: Request, res: Response) => {
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
});

//GET/users/:id
//GET http://localhost:3333/id
app.get("/users/:id", (req: Request, res: Response) => {
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
      message: result.toJsonOutTransactions(),
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.toString(),
    });
  }
});

//POST/users
// POST http://localhost:3333/users
app.post("/users", checkingDuplicateCpf, (req: Request, res: Response) => {
  try {
    const { name, cpf, email, age } = req.body;

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

    const newUser = new User(name, cpf, email, age);
    users.push(newUser);

    return res.status(201).send({
      success: true,
      message: "User was created",
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.toString(),
    });
  }
});

//PUT /users/:id:
// PUT http://localhost:3333/users/:id
app.put("/users/:id", (req: Request, res: Response) => {
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
});

//DELETE /users/:id
// DELETE http://localhost:3333/users/:id
app.delete("/users/:id", (req: Request, res: Response) => {
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
});

app.listen(3333, () => {
  console.log("Api is running port 3333...");
});
