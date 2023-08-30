
import { Server } from "./main/config/express.config";
import { Database } from "./main/database/database.connection";
import "reflect-metadata";





Database.connect().then(() => {
  console.log("Database is connected!");

  const app = Server.create();
  Server.listen(app);

});

//conexao sem ter criado uma classe
// pool
//   .connect()
//   .then((conection) => {
//     // console.log(conection);
//     listUsers(conection);
//     console.log("conexao com o bd realizada com sucesso!");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//inserindo query
// async function listUsers(connection: PoolClient) {
//   const result = await connection.query("select * from transactions.users");
//   console.log(result);
// }
