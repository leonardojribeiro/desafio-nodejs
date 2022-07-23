import { AppError } from "../../../../shared/errors/AppError";

export namespace CreateUserError {
  export class EmptyFullName extends AppError {
    constructor() {
      super('O campo "displayName" é obrigatório.');
    }
  }
  export class EmptyEmail extends AppError {
    constructor() {
      super('O campo "email" é obrigatório.');
    }
  }
  export class EmptyPassword extends AppError {
    constructor() {
      super('O campo "password" é obrigatório.');
    }
  }
  export class ShortPassword extends AppError {
    constructor() {
      super('O campo "password" precisa ter pelo menos 6 caracteres.');
    }
  }
  export class UserEmailAlreadyExists extends AppError {
    constructor() {
      super('Já existe outro usuário com o mesmo email.');
    }
  }
}