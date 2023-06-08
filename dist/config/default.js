"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DefaultExports {
    constructor() {
        this.port = () => process.env.SERVER_PORT || 9000;
        this.db_url = () => process.env.MONGO_URI;
        this.jwt_secret = () => process.env.JWT_SECRET;
        this.jwt_expires = () => process.env.JWT_EXPIRES;
        this.openai_api_key = () => process.env.OPENAI_API_KEY;
        this.flw_secret_key = () => process.env.FLW_SECRET_KEY;
        this.flw_public_key = () => process.env.FLW_PUBLIC_KEY;
    }
}
const defaults = new DefaultExports();
exports.default = defaults;
//# sourceMappingURL=default.js.map