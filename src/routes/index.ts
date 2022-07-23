import Router from "koa-router";
import { usersRouter } from "./users.routes";

export const router = new Router();



router
  .use('/users', usersRouter.routes,)
  .use(router.allowedMethods());