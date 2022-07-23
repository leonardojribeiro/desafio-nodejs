import { Document, FilterQuery, isValidObjectId, Model, Query } from "mongoose";
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
  validateId(id: string): boolean {
    return isValidObjectId(id);
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
      .select('displayName email photoUrl birthDate');
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

  async findById(id: string): Promise<IPublicUser | null> {
    return this.model
      .findById(id)
      .select('displayName email photoUrl birthDate')
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

  async findByEmail(email: string): Promise<IPublicUser | null> {
    return this.model
      .findOne({
        email
      })
      .select('displayName email photoUrl birthDate')
  }

}