"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const service_1 = __importDefault(require("../services/service"));
const users_model_1 = __importDefault(require("../database/model/users.model"));
class CreateXtifierController {
    constructor() {
        this.store = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                xtifier: 'required|string|min:3',
                ip_address: 'required|string',
                password: 'required|string|min:3',
                c_password: 'required|string|min:3'
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const { xtifier, ip_address, password, c_password } = body;
            if (password != c_password)
                return res.status(400).json({ status: false, message: "Password does not match" });
            const new_xtifier = service_1.default.formatInput(xtifier);
            const xtifierExists = await users_model_1.default.findOne({ xtifier: new_xtifier });
            if (xtifierExists)
                return res.status(400).json({ status: false, message: "Xtifier already exists" });
            const site_details = await service_1.default.getSiteDetails();
            const ipAddressExists = await users_model_1.default.findOne({ ip_address });
            if (ipAddressExists)
                return res.status(400).json({ status: false, message: `Your device has already been registered with our service. If you believe this is an error or if you need assistance, please contact our support team @ ${site_details ? site_details.email : ''}` });
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            const storeXitifier = await users_model_1.default.create({
                xtifier: new_xtifier,
                ip_address,
                status: true,
                password: hashPassword
            });
            if (!storeXitifier)
                return res.status(500).json({ status: false, message: 'Any error occured' });
            return res.status(201).json({ status: true, message: "Xtifier created successfully", data: storeXitifier });
        });
    }
}
const register = new CreateXtifierController();
exports.default = register;
//# sourceMappingURL=create.xtifiers.controller.js.map