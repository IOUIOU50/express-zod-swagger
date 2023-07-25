import { z } from "zod";
import { CreateExampleResult, createExampleResult } from "./create-one";

export const findExampleParams = z.object({
  id: z.string().openapi({
    description: "example id",
    example: "id",
  }),
});
export const findExampleResult = createExampleResult; // if spec is same with create, reuse it

export type FindExampleParams = z.infer<typeof findExampleParams>;
export type FindExampleResult = CreateExampleResult; // if spec is same with create, reuse it
