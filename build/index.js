"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const koa_1 = __importDefault(require("koa"));
const routes_1 = require("./routes");
const koa_body_1 = __importDefault(require("koa-body"));
const container_1 = require("./shared/container");
const errorHandler_1 = require("./shared/middlewares/errorHandler");
const connectToDatabase_1 = require("./databases/mongodb/connectToDatabase");
const koa2_swagger_ui_1 = require("koa2-swagger-ui");
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const koa = new koa_1.default();
(0, container_1.setupDependencies)();
(0, connectToDatabase_1.connectToDatabase)();
koa.use((0, koa_body_1.default)());
koa.use(errorHandler_1.errorHandler);
const spec = yamljs_1.default.load(path_1.default.resolve(__dirname, '..', 'api.yaml'));
koa.use((0, koa2_swagger_ui_1.koaSwagger)({
    routePrefix: '/',
    swaggerOptions: {
        spec
    }
}));
koa
    .use(routes_1.router.routes())
    .use(routes_1.router.allowedMethods());
const PORT = process.env.PORT || 3000;
const server = koa.listen(PORT, () => console.log(`Servidor ouvindo a porta ${PORT}`));
exports.default = server;
