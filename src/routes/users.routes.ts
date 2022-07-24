import Router from "koa-router";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { DeleteUserByIdController } from "../modules/users/useCases/deleteUserById/DeleteUserByIdController";
import { FindUserByIdController } from "../modules/users/useCases/findUserById/FindUserByIdController";
import { ListUsersController } from "../modules/users/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "../modules/users/useCases/updateUser/UpdateUserController";
import { applyPagination } from "../shared/middlewares/applyPagination";

export const usersRouter = new Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const findUserByIdController = new FindUserByIdController();
const updateUserController = new UpdateUserController();
const deleteUserByIdController = new DeleteUserByIdController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', applyPagination, listUsersController.handle);
usersRouter.get('/:id', findUserByIdController.handle);
usersRouter.patch('/:id', updateUserController.handle);
usersRouter.delete('/:id', deleteUserByIdController.handle);