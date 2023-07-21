import { ZodOaiController } from "api/controller";
import { Router } from "express";
import { ExampleService } from "./service";
import {
  createExampleBody,
  createExampleResult,
  createExampleSpec,
} from "./spec/create-one";
import {
  findExampleParams,
  findExampleResult,
  findExampleSpec,
} from "./spec/find-one";
import {
  findExamplesAllQuery,
  findExamplesAllResult,
  findExamplesAllSpec,
} from "./spec/find-all";

export function routeExampleV1(parent: Router) {
  const exampleController = new ZodOaiController("/api/v1/examples");
  const exampleService = new ExampleService();

  exampleController
    // create one
    .addApi({
      spec: createExampleSpec,
      handler: async (req, res) => {
        const body = createExampleBody.parse(req.body);
        const result = await exampleService.createOne(body);
        const response = createExampleResult.parse(result);
        res.status(201).json(response);
      },
    })

    // findOne
    .addApi({
      spec: findExampleSpec,
      handler: async (req, res) => {
        const { id } = findExampleParams.parse(req.params);
        const result = await exampleService.findOne(id);
        const response = findExampleResult.parse(result);
        res.status(200).json(response);
      },
    })

    // findAll
    .addApi({
      spec: findExamplesAllSpec,
      handler: async (req, res) => {
        const query = findExamplesAllQuery.parse(req.query);
        const result = await exampleService.findAll(query);
        const response = findExamplesAllResult.parse(result);
        res.status(200).json(response);
      },
    });

  parent.use(exampleController.getRouter());
}
