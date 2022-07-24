import { AppError } from "../../../../shared/errors/AppError";

export namespace DeleteUserByIdError {
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
}