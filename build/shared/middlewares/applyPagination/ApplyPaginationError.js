"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyPaginationError = void 0;
const AppError_1 = require("../../errors/AppError");
var ApplyPaginationError;
(function (ApplyPaginationError) {
    class InvalidLimit extends AppError_1.AppError {
        constructor() {
            super('O parâmetro "limit" deve ser maior ou igual a 1.');
        }
    }
    ApplyPaginationError.InvalidLimit = InvalidLimit;
    class InvalidPage extends AppError_1.AppError {
        constructor() {
            super('O parâmetro "page" deve ser maior ou igual a 1.');
        }
    }
    ApplyPaginationError.InvalidPage = InvalidPage;
})(ApplyPaginationError = exports.ApplyPaginationError || (exports.ApplyPaginationError = {}));
