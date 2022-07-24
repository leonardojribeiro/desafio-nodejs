require('dotenv').config();
import 'reflect-metadata';
import Koa from 'koa';
import { router } from './routes';
import koaBody from 'koa-body';
import { setupDependencies } from './shared/container';
import { errorHandler } from './shared/middlewares/errorHandler';
import { connectToDatabase } from './databases/mongodb/connectToDatabase';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';
import path from 'path';

const koa = new Koa();

setupDependencies();

connectToDatabase();

koa.use(koaBody());

koa.use(errorHandler);

const spec = yamljs.load(path.resolve(__dirname, '..', 'api.yaml'));

koa.use(koaSwagger({
  routePrefix: '/',
  swaggerOptions: {
    spec
  }
}));

koa
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

const server = koa.listen(
  PORT,
  () => console.log(`Servidor ouvindo a porta ${PORT}`),
);

export default server;