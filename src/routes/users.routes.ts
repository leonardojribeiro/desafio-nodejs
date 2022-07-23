import Router from "koa-router";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

export const usersRouter = new Router();

const createUserController = new CreateUserController();

usersRouter.post('/', createUserController.handle);