import { Model } from "mongoose";
import { injectable } from "tsyringe";
import { IPublicUser, IUser } from "../../../../entities/IUser";
import { IUsersRepository } from "../../../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../../../useCases/createUser/ICreateUserDTO";
import { UserModel } from "../../models/UserModel";

@injectable()
export class UsersRepository implements IUsersRepository {
  private readonly model: Model<IUser>;

  constructor() {
    this.model = UserModel;
  }

  async create(data: ICreateUserDTO): Promise<void> {
    await this.model.create(data);
  }

  find(): Promise<IPublicUser[]> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<IPublicUser | null> {
    throw new Error("Method not implemented.");
  }

  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async countByEmail(email: string): Promise<number> {
    return await this.model.count({
      email,
    });
  }
  
  countByEmailAndDifferentId(email: string, id: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<IPublicUser | null> {
    throw new Error("Method not implemented.");
  }

}