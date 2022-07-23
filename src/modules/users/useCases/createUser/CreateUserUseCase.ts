import { inject, injectable } from "tsyringe";
import { generateHash } from "../../../../shared/utils/hashGenerator";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { ICreateUserDTO } from "./ICreateUserDTO";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute({ displayName, email, password, photoUrl }: ICreateUserDTO): Promise<void> {
    if (!displayName) {
      throw new CreateUserError.EmptyFullName();
    }
    if (!email) {
      throw new CreateUserError.EmptyEmail();
    }
    if (!password) {
      throw new CreateUserError.EmptyPassword();
    }
    if (password.length < 6) {
      throw new CreateUserError.ShortPassword();
    }
    const emailAlreadyExistsCount = await this.usersRepository.countByEmail(email);
    if(emailAlreadyExistsCount){
      throw new CreateUserError.UserEmailAlreadyExists()
    }
    const hashPassword = await generateHash(password);
    await this.usersRepository.create({
      displayName,
      email,
      password: hashPassword,
      photoUrl,
    });
  }
}