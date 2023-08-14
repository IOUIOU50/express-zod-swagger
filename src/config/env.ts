import { config } from "dotenv";

config();

export const APP_CONFIG = {
  PORT: process.env.APP_PORT,
};

// export const REDIS_CONFIG = {
//   HOST: process.env.REDIS_HOST || throwError("REDIS_HOST"),
//   PORT: process.env.REDIS_PORT || throwError("REDIS_PORT"),
// };
