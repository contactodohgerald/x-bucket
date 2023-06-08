"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../database/model/users.model"));
const userRoles = async (req, res, next) => {
    const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
    if (user?.user_type == 'user') {
        return res.status(503).json({ status: false, mesaage: 'User not allowed to perform action' });
    }
    else {
        next();
    }
};
exports.default = userRoles;
//# sourceMappingURL=user.role.js.map