import yamljs from 'yamljs';
import path from 'path';
import { koaSwagger } from 'koa2-swagger-ui';
import { DefaultContext, DefaultState, Middleware } from 'koa';

export function swaggerDocs(): Middleware<DefaultState, DefaultContext, any> {
  const spec = yamljs.load(path.resolve(__dirname, '..', '..', '..', 'api.yaml'));
  return koaSwagger({
    routePrefix: '/',
    swaggerOptions: {
      spec
    }
  });
}