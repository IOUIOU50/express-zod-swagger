import { z } from "zod";
import { exampleEntity, exampleSchema } from "./common";

export const createExampleBody = exampleSchema;
export const createExampleResult = exampleEntity;

export type CreateExampleBody = z.infer<typeof createExampleBody>;
export type CreateExampleResult = z.infer<typeof createExampleResult>;
