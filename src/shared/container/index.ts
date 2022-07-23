import { container } from "tsyringe";
import { UsersRepository } from "../../modules/users/infra/mongodb/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";
import { ListUsersUseCase } from "../../modules/users/useCases/listUsers/ListUsersUseCase";

export function setupDependencies() {
  container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
  container.registerSingleton<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase);
  container.registerSingleton<ListUsersUseCase>('ListUsersUseCase', ListUsersUseCase);
}