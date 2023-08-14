import "./api/zod-to-openapi";
import { routeV1 } from "api/v1/route-v1";
import { routeV2 } from "api/v2/route-v2";
import { APP_CONFIG } from "config/env";
import { BadRequestError } from "error/extended";
import express from "express";
import { Server } from "http";
import { SwaggerLoader } from "loader/swagger";
import logger from "pino-http";
import swaggerUi from "swagger-ui-express";
import { ZodError } from "zod";

export async function startServer(): Promise<Server> {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logger());
  app.use(require("helmet")()); // cjs/esm error

  app.get("/", (req, res, next) => {
    res.status(200).end("ok");
    next();
  });
  app.head("/", (req, res, next) => {
    res.status(200).end("ok");
    next();
  });

  // route api
  routeV1(app);
  routeV2(app);

  app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(SwaggerLoader.instance.buildSwaggerDocs())
  );

  app.use(
    (
      err: unknown,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (err instanceof ZodError) {
        // request validation failed
        res.status(400).json(err);
        return next();
      }
      if (err instanceof BadRequestError) {
        // bad request error occurred in business logic
        res.status(err.status).json(err);
        return next();
      }

      // internal server error
      req.log.error(err);
      res.status(500).json({ message: "internal server error" });
    }
  );

  return new Promise((resolve, reject) => {
    try {
      const server = app.listen(APP_CONFIG.PORT, () => {
        resolve(server);
      });
    } catch (error) {
      reject(error);
    }
  });
}
