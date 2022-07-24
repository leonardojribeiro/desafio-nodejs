"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const UsersRepository_1 = require("../../modules/users/infra/mongodb/repositories/implementations/UsersRepository");
const CreateUserUseCase_1 = require("../../modules/users/useCases/createUser/CreateUserUseCase");
const FindUserByIdUseCase_1 = require("../../modules/users/useCases/findUserById/FindUserByIdUseCase");
const ListUsersUseCase_1 = require("../../modules/users/useCases/listUsers/ListUsersUseCase");
const UpdateUserUseCase_1 = require("../../modules/users/useCases/updateUser/UpdateUserUseCase");
function setupDependencies() {
    tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.UsersRepository);
    tsyringe_1.container.registerSingleton('CreateUserUseCase', CreateUserUseCase_1.CreateUserUseCase);
    tsyringe_1.container.registerSingleton('ListUsersUseCase', ListUsersUseCase_1.ListUsersUseCase);
    tsyringe_1.container.registerSingleton('FindUserByIdUseCase', FindUserByIdUseCase_1.FindUserByIdUseCase);
    tsyringe_1.container.registerSingleton('UpdateUserUseCase', UpdateUserUseCase_1.UpdateUserUseCase);
}
exports.setupDependencies = setupDependencies;
