"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const service_1 = __importDefault(require("../services/service"));
const users_model_1 = __importDefault(require("../database/model/users.model"));
const default_1 = __importDefault(require("../config/default"));
class LoginXtifierController {
    constructor() {
        this.store = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                xtifier: 'required|string|min:3',
                password: 'required|string|min:3',
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const { xtifier, password } = body;
            const new_xtifier = service_1.default.formatInput(xtifier);
            const xtifierExists = await users_model_1.default.findOne({ xtifier: new_xtifier });
            if (!xtifierExists)
                return res.status(400).json({ status: false, message: "Xtifier does not exist, please check and try again" });
            const checkPassword = await bcrypt_1.default.compare(password, xtifierExists.password);
            if (!checkPassword)
                return res.status(400).json({ status: false, message: "Incorrect password" });
            const site_details = await service_1.default.getSiteDetails();
            if (!xtifierExists.status)
                return res.status(400).json({ status: false, message: `Your account is on hold or suspended from using this service. Please contact @ ${site_details ? site_details.email : ''} for futher clarification` });
            const payload = { uuid: xtifierExists._id, xtifier: xtifierExists.xtifier, ipAddress: xtifierExists.ip_address };
            const token = jsonwebtoken_1.default.sign(payload, default_1.default.jwt_secret(), { expiresIn: default_1.default.jwt_expires() });
            const data = {
                ...payload, token,
            };
            return res.status(200).json({ status: true, message: "Login was successful", data });
        });
    }
}
const login = new LoginXtifierController();
exports.default = login;
//# sourceMappingURL=login.xtifiers.controller.js.map