import { z } from "zod";
import { findExampleResult } from "./find-one";

export const findExamplesAllQuery = z.object({
  propA: z.string().optional().openapi({
    description: "this is propA",
    example: "proaA",
  }),
  propB: z.string().optional().openapi({
    description: "this is propB",
    example: "proaB",
  }),
  propC: z.string().optional().openapi({
    description: "this is propC",
    example: "proaC",
  }),
  propD: z.string().optional().openapi({
    description: "this is propD",
    example: "proaD",
  }),
  offset: z
    .preprocess((v) => parseInt(v as string, 10), z.number().min(1).default(1))
    .openapi({
      description: "page offset",
      minimum: 1,
      default: 1,
      example: 1,
    }),
  limit: z
    .preprocess((v) => parseInt(v as string, 10), z.number().min(1).default(20))
    .openapi({
      description: "number of resources limit",
      minimum: 1,
      default: 20,
      example: 20,
    }),
});
export const findExamplesAllResult = z.array(findExampleResult);

export type FindExamplesAllQuery = z.infer<typeof findExamplesAllQuery>;
export type FindExamplesAllResult = z.infer<typeof findExamplesAllResult>;
