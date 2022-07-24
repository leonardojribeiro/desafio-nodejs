"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserByIdError = void 0;
const AppError_1 = require("../../../../shared/errors/AppError");
var DeleteUserByIdError;
(function (DeleteUserByIdError) {
    class InvalidId extends AppError_1.AppError {
        constructor() {
            super('O id do usuário é inválido.');
        }
    }
    DeleteUserByIdError.InvalidId = InvalidId;
    class UserNotFound extends AppError_1.AppError {
        constructor() {
            super('O usuário solicitado não foi encontrado.', 404);
        }
    }
    DeleteUserByIdError.UserNotFound = UserNotFound;
})(DeleteUserByIdError = exports.DeleteUserByIdError || (exports.DeleteUserByIdError = {}));
