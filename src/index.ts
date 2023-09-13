import { Server } from "./main/config/express.config";
import { Database } from "./main/database/database.connection";
import "reflect-metadata";
import { CacheRedisDataBase } from "./main/database/redis.connection";

Promise.all([Database.connect(), CacheRedisDataBase.connect()]).then(() => {
  const app = Server.create();
  Server.listen(app);
});

// Database.connect().then(() => {
//   CacheRedisDataBase.connect();
// });

// import { Redis } from "ioredis";

// const redis = new Redis({

// });

// redis
//   .get("userMargot")
//   .then((result) => {
//     if(result !== null){

//       const margot = JSON.parse(result)
//       margot.id += 1;

//       return redis.set("userMargot", JSON.stringify(margot))
//     }
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
