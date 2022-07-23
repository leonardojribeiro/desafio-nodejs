import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IListUsersRequestDTO } from "./IListUsersRequestDTO";
import { IListUsersResponseDTO } from "./IListUsersResponseDTO";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute(data: IListUsersRequestDTO): Promise<IListUsersResponseDTO> {
    const users = await this.usersRepository.find(data);
    const usersCount = await this.usersRepository.count(data);
    return {
      usersCount,
      users,
    }
  }
}