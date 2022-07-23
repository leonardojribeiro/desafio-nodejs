import { Document, FilterQuery, Model, Query } from "mongoose";
import { injectable } from "tsyringe";
import { IPublicUser, IUser } from "../../../../entities/IUser";
import { IUsersRepository } from "../../../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../../../useCases/createUser/ICreateUserDTO";
import { IListUsersRequestDTO } from "../../../../useCases/listUsers/IListUsersRequestDTO";
import { UserModel } from "../../models/UserModel";

@injectable()
export class UsersRepository implements IUsersRepository {
  private readonly model: Model<IUser>;

  constructor() {
    this.model = UserModel;
  }

  private generateFilterQuery({ displayName, email }: IListUsersRequestDTO): FilterQuery<IUser> {
    const filterQuery: FilterQuery<IUser> = {};
    if (displayName) {
      filterQuery.displayName = {
        $regex: displayName,
        $options: 'i',
      }
    }
    if (email) {
      filterQuery.email = {
        $regex: email,
        $options: 'i',
      }
    }
    return filterQuery;
  }

  async create(data: ICreateUserDTO): Promise<void> {
    await this.model.create(data);
  }

  async find(data: IListUsersRequestDTO): Promise<IPublicUser[]> {
    const filterQuery = this.generateFilterQuery(data);
    const query = this.model
      .find(filterQuery)
      .select('displayName email photoUrl');
    if (data.limit !== undefined && data.skip !== undefined) {
      query.skip(data.skip);
      query.limit(data.limit);
    }
    return await query;
  }

  async count(data: IListUsersRequestDTO): Promise<number> {
    const filterQuery = this.generateFilterQuery(data);
    const query = this.model.countDocuments(filterQuery);
    return await query;
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