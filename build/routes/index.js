"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const users_routes_1 = require("./users.routes");
exports.router = new koa_router_1.default();
exports.router.use('/users', users_routes_1.usersRouter.routes(), users_routes_1.usersRouter.allowedMethods());
