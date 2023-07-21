import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  RouteConfig,
} from "@asteasolutions/zod-to-openapi";

export class SwaggerLoader {
  private readonly paths: RouteConfig[];

  private constructor() {
    this.paths = [];
  }

  addPath(path: RouteConfig) {
    this.paths.push(path);
  }

  buildSwaggerDocs() {
    const registry = new OpenAPIRegistry();
    for (const path of this.paths) {
      registry.registerPath(path);
    }

    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument({
      openapi: "3.0.0",
      info: {
        title: "my-exrpess-server",
        version: "0.0.0",
        description:
          "my express server including request&response validation, typescript, express and swagger openapi.",
      },
    });
  }

  public static readonly instance = new SwaggerLoader(); // singleton
}
