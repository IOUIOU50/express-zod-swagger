import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import { SwaggerLoader } from "loader/swagger";

// zod input validation + openAPI(swagger)
export class ZodOaiController {
  private readonly router: Router;

  constructor(private readonly prefix: string = "") {
    this.router = Router();
  }

  addApi(option: ServiceHandlerOption) {
    option.spec.path = this.prefix + option.spec.path.replace(/\/$/, ""); // 마지막 슬래시 제거

    this.router[option.spec.method](
      option.spec.path.replace(/{/g, ":").replace(/}/g, ""),
      [
        ...(option.middlewares || []),
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            await option.handler(req, res);
          } catch (error) {
            next(error);
          }
        },
      ]
    );

    SwaggerLoader.instance.addPath(option.spec); // for swagger
    return this; // builder pattern
  }

  getRouter() {
    return this.router;
  }
}

export type ServiceHandlerOption = {
  spec: RouteConfig;
  auth?: boolean;
  middlewares?: RequestHandler[];
  handler: (req: Request, res: Response) => Promise<void>;
};
