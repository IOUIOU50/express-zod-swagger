import { z } from "zod";

export const exampleSchema = {
  propA: z.string().openapi({
    description: "this is propA",
    example: "proaA",
  }),
  propB: z.string().openapi({
    description: "this is propB",
    example: "proaB",
  }),
  propC: z.string().openapi({
    description: "this is propC",
    example: "proaC",
  }),
  propD: z.string().openapi({
    description: "this is propD",
    example: "proaD",
  }),
};

export const exampleEntity = {
  id: z.string().openapi({
    description: "identifier",
    example: "d525f775-ec6e-4e35-b7e3-f1dacae17238",
  }),
  ...exampleSchema,
};
