import { IPublicUser, IUser } from "../entities/IUser";
import { ICreateUserDTO } from "../useCases/createUser/ICreateUserDTO";
import { IListUsersRequestDTO } from "../useCases/listUsers/IListUsersRequestDTO";
import { IUpdateUserDTO } from "../useCases/updateUser/IUpdateUserDTO";

export interface IUsersRepository {
  delete(id: string): Promise<void>;
  create(data: ICreateUserDTO): Promise<void>;
  find(data: IListUsersRequestDTO): Promise<IPublicUser[]>;
  count(data: IListUsersRequestDTO): Promise<number>
  findById(id: string): Promise<IPublicUser | null>;
  update(data: IUpdateUserDTO): Promise<void>;
  countByEmail(email: string): Promise<number>;
  countByEmailAndDifferentId(email: string, id: string): Promise<number>; 
  validateId(id: string): boolean;
}