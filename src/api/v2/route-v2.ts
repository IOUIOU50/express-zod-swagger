import { Router } from "express";

export function routeV2(parent: Router) {
  const router = Router();

  // attach sub routers

  // attach v1 router to parent router(might be express app)
  parent.use(router);
}
