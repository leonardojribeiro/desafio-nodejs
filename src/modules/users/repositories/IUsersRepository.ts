import { IPublicUser } from "../entities/IUser";
import { ICreateUserDTO } from "../useCases/createUser/ICreateUserDTO";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  find(): Promise<IPublicUser[]>;
  findById(id: string): Promise<IPublicUser | null>;
  update(): Promise<void>;
  countByEmail(email: string): Promise<number>;
  countByEmailAndDifferentId(email: string, id: string): Promise<number>;
  findByEmail(email: string): Promise<IPublicUser | null>;
}