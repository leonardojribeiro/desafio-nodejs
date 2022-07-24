import { inject, injectable } from "tsyringe"; 
import { IUsersRepository } from "../../repositories/IUsersRepository"; 
import { DeleteUserByIdError } from "./DeleteUserByIdError";

@injectable()
export class DeleteUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if (!this.usersRepository.validateId(id)) {
      throw new DeleteUserByIdError.InvalidId();
    }
    const user = await this.usersRepository.findById(id);
    if(!user){
      throw new DeleteUserByIdError.UserNotFound();
    } 
    await this.usersRepository.delete(id);
  }
}