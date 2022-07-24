"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserError = void 0;
const AppError_1 = require("../../../../shared/errors/AppError");
var UpdateUserError;
(function (UpdateUserError) {
    class InvalidId extends AppError_1.AppError {
        constructor() {
            super('O id do usuário é inválido.');
        }
    }
    UpdateUserError.InvalidId = InvalidId;
    class UserNotFound extends AppError_1.AppError {
        constructor() {
            super('O usuário solicitado não foi encontrado.', 404);
        }
    }
    UpdateUserError.UserNotFound = UserNotFound;
    class ShortPassword extends AppError_1.AppError {
        constructor() {
            super('O campo "password" precisa ter pelo menos 6 caracteres.');
        }
    }
    UpdateUserError.ShortPassword = ShortPassword;
    class InvalidBirthDate extends AppError_1.AppError {
        constructor() {
            super('O campo "birthDate" é inválido.');
        }
    }
    UpdateUserError.InvalidBirthDate = InvalidBirthDate;
    class Under18YearsOld extends AppError_1.AppError {
        constructor() {
            super('O usuário é menor de 18 anos.');
        }
    }
    UpdateUserError.Under18YearsOld = Under18YearsOld;
    class UserEmailAlreadyExists extends AppError_1.AppError {
        constructor() {
            super('Já existe outro usuário com o mesmo email.');
        }
    }
    UpdateUserError.UserEmailAlreadyExists = UserEmailAlreadyExists;
})(UpdateUserError = exports.UpdateUserError || (exports.UpdateUserError = {}));
