import { z } from "zod";
import { CreateExampleResult, createExampleResult } from "./create-one";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";

export const findExampleParams = z.object({
  id: z.string().openapi({
    description: "example id",
    example: "id",
  }),
});
export const findExampleResult = createExampleResult; // if spec is same with create, reuse it
export const findExampleSpec: RouteConfig = {
  method: "get",
  path: "/{id}",
  summary: "find a single example by id",
  description:
    "find a single example by id, If don't remember id, use API that retrives all examples by queury.",
  request: {
    params: findExampleParams,
  },
  responses: {
    [200]: {
      description: "succeed to find a single example by id",
      content: {
        "application/json": {
          schema: findExampleResult,
        },
      },
    },
  },
};

export type FindExampleParams = z.infer<typeof findExampleParams>;
export type FindExampleResult = CreateExampleResult; // if spec is same with create, reuse it
