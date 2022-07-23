import { inject, injectable } from "tsyringe";
import { generateHash } from "../../../../shared/utils/hashGenerator";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { ICreateUserDTO } from "./ICreateUserDTO";

import dayjs from "dayjs";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute({ displayName, email, password, photoUrl, birthDate }: ICreateUserDTO): Promise<void> {
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
    if (!birthDate) {
      throw new CreateUserError.EmptyBirthDate();
    }
    const birthDateParsed = dayjs(birthDate);
    if (!birthDateParsed.isValid()) {
      throw new CreateUserError.InvalidBirthDate();
    }
    if (birthDateParsed.isAfter(dayjs().subtract(18, 'year'))) {
      throw new CreateUserError.Under18YearsOld();
    }
    const emailAlreadyExistsCount = await this.usersRepository.countByEmail(email);
    if (emailAlreadyExistsCount) {
      throw new CreateUserError.UserEmailAlreadyExists()
    }
    const hashPassword = await generateHash(password);
    await this.usersRepository.create({
      displayName,
      email,
      password: hashPassword,
      photoUrl,
      birthDate: birthDateParsed.toDate(),
    });
  }
}