import { RouteConfig, ZodRequestBody } from "@asteasolutions/zod-to-openapi";
import { CommonError } from "error/extended";
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import { SwaggerLoader } from "loader/swagger";
import { AnyZodObject, ZodType } from "zod";

// zod input validation + openAPI(swagger)
export class ZodOaiController {
  private readonly router: Router;

  constructor(private readonly prefix: string = "") {
    this.router = Router();
  }

  /**
   * for handle request by using express req & res object manually by returnning JSON value
   */
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

  /**
   * easily response 'application/json' content with status
   */
  addJsonApi(option: JsonHandlerOption) {
    option.spec.path = this.prefix + option.spec.path.replace(/\/$/, ""); // 마지막 슬래시 제거

    this.router[option.spec.method](
      option.spec.path.replace(/{/g, ":").replace(/}/g, ""),
      [
        ...(option.middlewares || []),
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const { result, status, headers } = await option.handler(req);
            const response = option.response.schema.safeParse(result);
            if (!response.success) {
              throw new CommonError("response validation failed", 500, {
                ...response.error,
              });
            }

            if (headers) {
              res.set(headers);
            }
            res.status(status);
            if (status === 204 && result == null) {
              res.end();
            } else {
              res.json(response.data);
            }
            next();
          } catch (error) {
            next(error);
          }
        },
      ]
    );

    const routeConfig: RouteConfig = {
      method: option.spec.method,
      path: option.spec.path,
      responses: {
        [option.response.status]: {
          description: option.response.description,
        },
      },
    };
    if (option.spec.summary) {
      routeConfig.summary = option.spec.summary;
    }
    if (option.spec.description) {
      routeConfig.description = option.spec.description;
    }
    if (option.spec.tags) {
      routeConfig.tags = option.spec.tags;
    }
    if (option.request) {
      routeConfig.request = {};
      if (option.request.headers) {
        routeConfig.request.headers = option.request.headers;
      }
      if (option.request.params) {
        routeConfig.request.params = option.request.params;
      }
      if (option.request.query) {
        routeConfig.request.query = option.request.query;
      }
      if (option.request.body) {
        routeConfig.request.body = {
          content: {
            "application/json": {
              schema: option.request.body,
            },
          },
        };
      }
    }

    SwaggerLoader.instance.addPath(routeConfig); // for swagger
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
export type JsonRouteConfig = Pick<
  RouteConfig,
  "method" | "path" | "tags" | "summary" | "description"
>;
export type JsonHandlerOption = {
  spec: JsonRouteConfig;
  middlewares?: RequestHandler[];
  request?: {
    body?: ZodType<unknown>;
    params?: AnyZodObject;
    query?: AnyZodObject;
    headers?: AnyZodObject | ZodType<unknown>[];
  };
  response: {
    status: number;
    description: string;
    headers?: AnyZodObject;
    schema: ZodType<unknown>;
  };
  handler: (req: Request) => Promise<{
    status: number;
    headers?: AnyZodObject;
    result: unknown;
  }>;
};
