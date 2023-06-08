"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../database/model/users.model"));
const userIsSubscribed = async (req, res, next) => {
    const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
    if (user?.is_subscribed) {
        next();
    }
    else {
        return res.status(503).json({ status: false, mesaage: 'You are not subscribed' });
    }
};
exports.default = userIsSubscribed;
//# sourceMappingURL=subscribed.js.map