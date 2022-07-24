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
exports.CreateUserUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const hashGenerator_1 = require("../../../../shared/utils/hashGenerator");
const CreateUserError_1 = require("./CreateUserError");
const dayjs_1 = __importDefault(require("dayjs"));
let CreateUserUseCase = class CreateUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ displayName, email, password, photoUrl, birthDate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!displayName) {
                throw new CreateUserError_1.CreateUserError.EmptyFullName();
            }
            if (!email) {
                throw new CreateUserError_1.CreateUserError.EmptyEmail();
            }
            if (!password) {
                throw new CreateUserError_1.CreateUserError.EmptyPassword();
            }
            if (password.length < 6) {
                throw new CreateUserError_1.CreateUserError.ShortPassword();
            }
            if (!birthDate) {
                throw new CreateUserError_1.CreateUserError.EmptyBirthDate();
            }
            const birthDateParsed = (0, dayjs_1.default)(birthDate);
            if (!birthDateParsed.isValid()) {
                throw new CreateUserError_1.CreateUserError.InvalidBirthDate();
            }
            if (birthDateParsed.isAfter((0, dayjs_1.default)().subtract(18, 'year'))) {
                throw new CreateUserError_1.CreateUserError.Under18YearsOld();
            }
            const emailAlreadyExistsCount = yield this.usersRepository.countByEmail(email);
            if (emailAlreadyExistsCount) {
                throw new CreateUserError_1.CreateUserError.UserEmailAlreadyExists();
            }
            const hashPassword = yield (0, hashGenerator_1.generateHash)(password);
            yield this.usersRepository.create({
                displayName,
                email,
                password: hashPassword,
                photoUrl,
                birthDate: birthDateParsed.toDate(),
            });
        });
    }
};
CreateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __metadata("design:paramtypes", [Object])
], CreateUserUseCase);
exports.CreateUserUseCase = CreateUserUseCase;
