import { startServer } from "app";
import { APP_CONFIG } from "config/env";

async function main() {
  // await Redis.intialize();
  // await MySQL.initialize();
  // await Mongo.initialize();
  // await Postgres.initialize();

  await startServer();
  console.log("server started at port", APP_CONFIG.PORT);
}

main();
