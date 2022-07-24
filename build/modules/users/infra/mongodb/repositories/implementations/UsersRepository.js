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
exports.UsersRepository = void 0;
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const UserModel_1 = require("../../models/UserModel");
let UsersRepository = class UsersRepository {
    constructor() {
        this.model = UserModel_1.UserModel;
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.deleteOne({
                _id: id
            });
        });
    }
    validateId(id) {
        return (0, mongoose_1.isValidObjectId)(id);
    }
    generateFilterQuery({ displayName, email }) {
        const filterQuery = {};
        if (displayName) {
            filterQuery.displayName = {
                $regex: displayName,
                $options: 'i',
            };
        }
        if (email) {
            filterQuery.email = {
                $regex: email,
                $options: 'i',
            };
        }
        return filterQuery;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.create(data);
        });
    }
    find(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterQuery = this.generateFilterQuery(data);
            const query = this.model
                .find(filterQuery)
                .select('displayName email photoUrl birthDate');
            if (data.limit !== undefined && data.skip !== undefined) {
                query.skip(data.skip);
                query.limit(data.limit);
            }
            return yield query;
        });
    }
    count(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterQuery = this.generateFilterQuery(data);
            const query = this.model.countDocuments(filterQuery);
            return yield query;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .findById(id)
                .select('displayName email photoUrl birthDate');
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.updateOne({
                _id: data.id
            }, {
                $set: data,
            });
        });
    }
    countByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.count({
                email,
            });
        });
    }
    countByEmailAndDifferentId(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.count({
                _id: {
                    $ne: id,
                },
                email,
            });
        });
    }
};
UsersRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], UsersRepository);
exports.UsersRepository = UsersRepository;
