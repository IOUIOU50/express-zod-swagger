import { Router } from "express";
import { routeExampleV1 } from "./example/route";

export function routeV1(parent: Router) {
  const router = Router();

  // attach sub routers
  routeExampleV1(router);

  // attach v1 router to parent router(might be express app)
  parent.use(router);
}
