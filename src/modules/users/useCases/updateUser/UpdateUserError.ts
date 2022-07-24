import { AppError } from "../../../../shared/errors/AppError";

export namespace UpdateUserError {
  export class InvalidId extends AppError {
    constructor() {
      super('O id do usuário é inválido.');
    }
  }
  export class UserNotFound extends AppError {
    constructor() {
      super('O usuário solicitado não foi encontrado.', 404);
    }
  }
  export class ShortPassword extends AppError {
    constructor() {
      super('O campo "password" precisa ter pelo menos 6 caracteres.');
    }
  }
  export class InvalidBirthDate extends AppError {
    constructor() {
      super('O campo "birthDate" é inválido.');
    }
  }
  export class Under18YearsOld extends AppError {
    constructor() {
      super('O usuário é menor de 18 anos.');
    }
  }
  export class UserEmailAlreadyExists extends AppError {
    constructor() {
      super('Já existe outro usuário com o mesmo email.');
    }
  }
}