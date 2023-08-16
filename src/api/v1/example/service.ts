import { BadRequestError } from "error/extended";
import { CreateExampleBody, CreateExampleResult } from "./spec/create-one";
import { FindExamplesAllQuery, FindExamplesAllResult } from "./spec/find-all";
import { FindExampleResult } from "./spec/find-one";

export class ExampleService {
  async createOne(payload: CreateExampleBody) {
    // write your service logic and replace return value
    return await Promise.resolve({
      id: "id",
      propA: "propA",
      propB: "propB",
      propC: "propC",
      propD: "propD",
    });
  }

  async findOne(id: string) {
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

  async findAll(query: FindExamplesAllQuery) {
    // write your service logic and replace return value
    return [];
  }

  async updateUser(
    id: string,
    body: { propA?: string; propB?: string; propC?: string; propD?: string }
  ) {}
}
