import Koa from 'koa';
import Router from 'koa-router';
import { usersRouter } from './routes/users.routes';

const koa = new Koa();
const router = new Router();

// // //rota simples pra testar se o servidor está online
// // router.get('/', async (ctx) => {
// //   ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
// // });

// // //Uma rota de exemplo simples aqui.
// // //As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
// // router.get('/users', async (ctx) => {
// //   ctx.status = 200;
// //   ctx.body = { total: 0, count: 0, rows: [] }
// // });
koa.on('error', (err, context) => {
  console.log('server error hahah', err, context);
  context.status = 400;
});

koa
  .use(usersRouter.routes())
  .use(usersRouter.allowedMethods());


const PORT = process.env.PORT || 3000;
const server = koa.listen(
  PORT,
  () => console.log(`Servidor ouvindo a porta ${PORT}`),
);

module.exports = server;