"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const combineRouter = (app) => {
    app.use('/api/v1/', router_1.default);
};
exports.default = combineRouter;
//# sourceMappingURL=api.js.map