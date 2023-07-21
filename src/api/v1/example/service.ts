import { BadRequestError } from "error/extended";
import { CreateExampleBody, CreateExampleResult } from "./spec/create-one";
import { FindExamplesAllQuery, FindExamplesAllResult } from "./spec/find-all";
import { FindExampleResult } from "./spec/find-one";

export class ExampleService {
  async createOne(payload: CreateExampleBody): Promise<CreateExampleResult> {
    // write your service logic and replace return value
    return await Promise.resolve({
      id: "id",
      propA: "propA",
      propB: "propB",
      propC: "propC",
      propD: "propD",
    });
  }

  async findOne(id: string): Promise<FindExampleResult> {
    // write your service logic and replace return value
    if (id !== "id") {
      throw new BadRequestError("couldn't find resource matched with id", 404);
    }

    return await Promise.resolve({
      id: "id",
      propA: "propA",
      propB: "propB",
      propC: "propC",
      propD: "propD",
    });
  }

  async findAll(query: FindExamplesAllQuery): Promise<FindExamplesAllResult> {
    // write your service logic and replace return value
    return await Promise.resolve([]);
  }
}
