"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPagination = void 0;
const ApplyPaginationError_1 = require("./ApplyPaginationError");
function applyPagination(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawPage = context.request.query.page;
        const rawLimit = context.request.query.limit;
        const page = Number(rawPage);
        const limit = Number(rawLimit);
        if (!isNaN(page) && !isNaN(limit)) {
            if (page < 1) {
                throw new ApplyPaginationError_1.ApplyPaginationError.InvalidPage();
            }
            if (limit < 1) {
                throw new ApplyPaginationError_1.ApplyPaginationError.InvalidLimit();
            }
            context.state = {
                limit: limit,
                skip: (page - 1) * limit,
            };
        }
        yield next();
    });
}
exports.applyPagination = applyPagination;
