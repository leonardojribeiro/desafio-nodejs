require('dotenv').config();
import 'reflect-metadata';
import Koa from 'koa';
import { router } from './routes';
import koaBody from 'koa-body';
import { setupDependencies } from './shared/container';
import { errorHandler } from './shared/middlewares/errorHandler';
import { connectToDatabase } from './databases/mongodb/connectToDatabase';
import { swaggerDocs } from './shared/middlewares/swaggerDocs';

const koa = new Koa();
setupDependencies();
connectToDatabase();
koa.use(koaBody());
koa.use(errorHandler);
koa.use(swaggerDocs());
koa
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
const server = koa.listen(
  PORT,
  () => console.log(`Servidor ouvindo a porta ${PORT}`),
);

export default server;