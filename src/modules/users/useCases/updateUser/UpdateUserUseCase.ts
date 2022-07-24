import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { generateHash } from "../../../../shared/utils/hashGenerator";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUpdateUserDTO } from "./IUpdateUserDTO";
import { UpdateUserError } from "./UpdateUserError";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute({ id, displayName, email, password, birthDate, photoUrl }: IUpdateUserDTO): Promise<void> {
    if (!this.usersRepository.validateId(id)) {
      throw new UpdateUserError.InvalidId();
    }
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new UpdateUserError.UserNotFound();
    }
    const newUser: IUpdateUserDTO = { id };
    if (displayName) {
      newUser.displayName = displayName;
    }
    if (birthDate) {
      const birthDateParsed = dayjs(birthDate);
      if (!birthDateParsed.isValid()) {
        throw new UpdateUserError.InvalidBirthDate();
      }
      if (birthDateParsed.isAfter(dayjs().subtract(18, 'year'))) {
        throw new UpdateUserError.Under18YearsOld();
      }
      newUser.birthDate = birthDateParsed.toDate();
    }
    if (email) {
      const usersWithEmailCount = await this.usersRepository.countByEmailAndDifferentId(email, id);
      if (usersWithEmailCount) {
        throw new UpdateUserError.UserEmailAlreadyExists();
      }
      newUser.email = email;
    }
    if (password) {
      if (password.length < 6) {
        throw new UpdateUserError.ShortPassword();
      }
      newUser.password = await generateHash(password);
    }
    if (photoUrl !== undefined) {
      newUser.photoUrl = photoUrl;
    }
    await this.usersRepository.update(newUser);
  }
}