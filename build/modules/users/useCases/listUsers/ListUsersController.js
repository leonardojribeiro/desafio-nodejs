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
exports.ListUsersController = void 0;
const tsyringe_1 = require("tsyringe");
const ListUsersUseCase_1 = require("./ListUsersUseCase");
class ListUsersController {
    handle(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const displayName = context.request.query.displayName;
            const email = context.request.query.email;
            const { limit, skip } = context.state;
            const listUsersUseCase = tsyringe_1.container.resolve(ListUsersUseCase_1.ListUsersUseCase);
            const usersResponse = yield listUsersUseCase.execute({
                displayName,
                email,
                limit,
                skip,
            });
            context.response.status = 200;
            context.response.body = usersResponse;
        });
    }
}
exports.ListUsersController = ListUsersController;
