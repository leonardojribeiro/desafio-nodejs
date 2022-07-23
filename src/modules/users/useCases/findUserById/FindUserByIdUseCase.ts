import { inject, injectable } from "tsyringe";
import { IPublicUser } from "../../entities/IUser";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { FindUserByIdError } from "./FindUserByIdError";

@injectable()
export class FindUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<IPublicUser | null> {
    if (!this.usersRepository.validateId(id)) {
      throw new FindUserByIdError.InvalidId();
    }
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new FindUserByIdError.UserNotFound();
    }
    return user;
  }
}