import Router from "koa-router";

export const usersRouter = new Router();

usersRouter.post('/users', (context) => {
  console.log(context);
  context.body = 'olá';
  throw new Error('teste');
});