"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const tsyringe_1 = require("tsyringe");
const hashGenerator_1 = require("../../../../shared/utils/hashGenerator");
const UpdateUserError_1 = require("./UpdateUserError");
let UpdateUserUseCase = class UpdateUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ id, displayName, email, password, birthDate, photoUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.usersRepository.validateId(id)) {
                throw new UpdateUserError_1.UpdateUserError.InvalidId();
            }
            const user = yield this.usersRepository.findById(id);
            if (!user) {
                throw new UpdateUserError_1.UpdateUserError.UserNotFound();
            }
            const newUser = { id };
            if (displayName) {
                newUser.displayName = displayName;
            }
            if (birthDate) {
                const birthDateParsed = (0, dayjs_1.default)(birthDate);
                if (!birthDateParsed.isValid()) {
                    throw new UpdateUserError_1.UpdateUserError.InvalidBirthDate();
                }
                if (birthDateParsed.isAfter((0, dayjs_1.default)().subtract(18, 'year'))) {
                    throw new UpdateUserError_1.UpdateUserError.Under18YearsOld();
                }
                newUser.birthDate = birthDateParsed.toDate();
            }
            if (email) {
                const usersWithEmailCount = yield this.usersRepository.countByEmailAndDifferentId(email, id);
                if (usersWithEmailCount) {
                    throw new UpdateUserError_1.UpdateUserError.UserEmailAlreadyExists();
                }
                newUser.email = email;
            }
            if (password) {
                if (password.length < 6) {
                    throw new UpdateUserError_1.UpdateUserError.ShortPassword();
                }
                newUser.password = yield (0, hashGenerator_1.generateHash)(password);
            }
            if (photoUrl !== undefined) {
                newUser.photoUrl = photoUrl;
            }
            yield this.usersRepository.update(newUser);
        });
    }
};
UpdateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateUserUseCase);
exports.UpdateUserUseCase = UpdateUserUseCase;
