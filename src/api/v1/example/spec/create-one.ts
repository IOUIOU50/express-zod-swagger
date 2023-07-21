import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { exampleEntity, exampleSchema } from "./common";

export const createExampleBody = z.object(exampleSchema);
export const createExampleResult = z.object(exampleEntity);
export const createExampleSpec: RouteConfig = {
  method: "post",
  path: "/",
  summary: "create a single example",
  description:
    "this is a API that creates single example resource. request with followed schema",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createExampleBody,
        },
      },
    },
  },
  responses: {
    [201]: {
      description: "succeed to create a single example",
      content: {
        "application/json": {
          schema: createExampleResult,
        },
      },
    },
  },
};

export type CreateExampleBody = z.infer<typeof createExampleBody>;
export type CreateExampleResult = z.infer<typeof createExampleResult>;
