import { z } from "zod";
import { exampleEntity, exampleSchema } from "./common";

export const createExampleBody = z.object(exampleSchema);
export const createExampleResult = z.object(exampleEntity);

export type CreateExampleBody = z.infer<typeof createExampleBody>;
export type CreateExampleResult = z.infer<typeof createExampleResult>;
