"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserByIdError = void 0;
const AppError_1 = require("../../../../shared/errors/AppError");
var FindUserByIdError;
(function (FindUserByIdError) {
    class InvalidId extends AppError_1.AppError {
        constructor() {
            super('O id do usuário é inválido.');
        }
    }
    FindUserByIdError.InvalidId = InvalidId;
    class UserNotFound extends AppError_1.AppError {
        constructor() {
            super('O usuário solicitado não foi encontrado.', 404);
        }
    }
    FindUserByIdError.UserNotFound = UserNotFound;
})(FindUserByIdError = exports.FindUserByIdError || (exports.FindUserByIdError = {}));
