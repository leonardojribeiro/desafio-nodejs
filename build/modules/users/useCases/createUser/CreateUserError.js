"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserError = void 0;
const AppError_1 = require("../../../../shared/errors/AppError");
var CreateUserError;
(function (CreateUserError) {
    class EmptyFullName extends AppError_1.AppError {
        constructor() {
            super('O campo "displayName" é obrigatório.');
        }
    }
    CreateUserError.EmptyFullName = EmptyFullName;
    class EmptyEmail extends AppError_1.AppError {
        constructor() {
            super('O campo "email" é obrigatório.');
        }
    }
    CreateUserError.EmptyEmail = EmptyEmail;
    class EmptyPassword extends AppError_1.AppError {
        constructor() {
            super('O campo "password" é obrigatório.');
        }
    }
    CreateUserError.EmptyPassword = EmptyPassword;
    class ShortPassword extends AppError_1.AppError {
        constructor() {
            super('O campo "password" precisa ter pelo menos 6 caracteres.');
        }
    }
    CreateUserError.ShortPassword = ShortPassword;
    class EmptyBirthDate extends AppError_1.AppError {
        constructor() {
            super('O campo "birthDate" é obrigatório.');
        }
    }
    CreateUserError.EmptyBirthDate = EmptyBirthDate;
    class InvalidBirthDate extends AppError_1.AppError {
        constructor() {
            super('O campo "birthDate" é inválido.');
        }
    }
    CreateUserError.InvalidBirthDate = InvalidBirthDate;
    class Under18YearsOld extends AppError_1.AppError {
        constructor() {
            super('O usuário é menor de 18 anos.');
        }
    }
    CreateUserError.Under18YearsOld = Under18YearsOld;
    class UserEmailAlreadyExists extends AppError_1.AppError {
        constructor() {
            super('Já existe outro usuário com o mesmo email.');
        }
    }
    CreateUserError.UserEmailAlreadyExists = UserEmailAlreadyExists;
})(CreateUserError = exports.CreateUserError || (exports.CreateUserError = {}));
