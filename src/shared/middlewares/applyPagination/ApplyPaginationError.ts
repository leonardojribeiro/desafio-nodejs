import { AppError } from "../../errors/AppError";

export namespace ApplyPaginationError {
  export class InvalidLimit extends AppError {
    constructor() {
      super('O parâmetro "limit" deve ser maior ou igual a 1.');
    }
  }
  export class InvalidPage extends AppError {
    constructor() {
      super('O parâmetro "page" deve ser maior ou igual a 1.');
    }
  }
}