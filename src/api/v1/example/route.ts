import { ZodOaiController } from "api/controller";
import { Router } from "express";
import { ExampleService } from "./service";
import { createExampleBody, createExampleResult } from "./spec/create-one";
import { findExampleParams, findExampleResult } from "./spec/find-one";
import { findExamplesAllQuery, findExamplesAllResult } from "./spec/find-all";
import { z } from "zod";

export function routeExampleV1(parent: Router) {
  const exampleController = new ZodOaiController({
    prefix: "/api/v1/examples",
  });
  const exampleService = new ExampleService();

  exampleController
    // create a single example
    .addRestApi({
      spec: {
        method: "post",
        path: "/",
        tags: ["example"],
        summary: "create a single example",
        description:
          "this is a API that creates single example resource. request with followed schema",
      },
      request: {
        body: createExampleBody,
      },
      response: {
        status: 201,
        schema: createExampleResult,
        description: "succeed to create result",
      },
      handler: async ({ body }) => {
        const result = await exampleService.createOne(body);
        return result;
      },
    })

    // findOne
    .addRestApi({
      spec: {
        method: "get",
        path: "/{id}",
        summary: "find a single example",
        description: "find a single example by id",
        tags: ["example"],
      },
      request: {
        params: findExampleParams,
      },
      response: {
        description: "succeed to find a single example by id",
        status: 200,
        schema: findExampleResult,
      },
      handler: async ({ params }) => {
        const result = await exampleService.findOne(params.id);
        return result;
      },
    })

    // findAll
    .addRestApi({
      spec: {
        method: "get",
        path: "/",
        summary: "find mutiple examples",
        description: "find multiple examples with followed query",
        tags: ["example"],
      },
      request: {
        query: findExamplesAllQuery,
      },
      response: {
        description: "succeed to find multiple examples",
        schema: findExamplesAllResult,
        status: 200,
      },
      handler: async ({ query }) => {
        const result = await exampleService.findAll(query);
        return result;
      },
    })

    .addRestApi({
      spec: {
        method: "delete",
        path: "/{id}",
        tags: ["example"],
        summary: "delete user",
      },
      request: {
        params: z.object({
          id: z.string(),
        }),
      },
      response: {
        status: 204,
        description: "succeed to delete user",
      },
      handler: async ({ params }) => {
        return { id: "" };
      },
    })

    .addRestApi({
      spec: {
        method: "patch",
        path: "/{id}",
        tags: ["example"],
        summary: "update user",
      },
      request: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({}),
      },
      response: {
        status: 204,
        description: "succeed to update user",
      },
      handler: async ({ params, body }) => {},
    });

  parent.use(exampleController.getRouter());
}
