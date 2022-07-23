import Router from "koa-router";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { FindUserByIdController } from "../modules/users/useCases/findUserById/FindUserByIdController";
import { ListUsersController } from "../modules/users/useCases/listUsers/ListUsersController";
import { applyPagination } from "../shared/middlewares/applyPagination";

export const usersRouter = new Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const findUserByIdController = new FindUserByIdController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', applyPagination, listUsersController.handle);
usersRouter.get('/:id', findUserByIdController.handle);