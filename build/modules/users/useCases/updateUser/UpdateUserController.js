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
exports.UpdateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateUserUseCase_1 = require("./UpdateUserUseCase");
class UpdateUserController {
    handle(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { displayName, email, password, photoUrl, birthDate } = context.request.body;
            const id = context.params.id;
            const updateUserUseCase = tsyringe_1.container.resolve(UpdateUserUseCase_1.UpdateUserUseCase);
            yield updateUserUseCase.execute({
                id,
                displayName,
                email,
                password,
                photoUrl,
                birthDate,
            });
            context.response.status = 200;
            context.response.body = {
                message: "Usuário alterado.",
            };
        });
    }
}
exports.UpdateUserController = UpdateUserController;
