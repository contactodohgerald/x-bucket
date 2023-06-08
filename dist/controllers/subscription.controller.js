"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const users_model_1 = __importDefault(require("../database/model/users.model"));
const flutterwave_1 = __importDefault(require("../services/flutterwave"));
const subscription_model_1 = __importDefault(require("../database/model/subscription.model"));
class SubscriptionController {
    constructor() {
        this.subscribeUser = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                trans_id: 'required|string',
                amount: 'required|integer'
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
            const { trans_id, amount } = body;
            const subscribeExist = await subscription_model_1.default.findOne({ userId: user?._id, status: true });
            if (subscribeExist)
                return res.status(500).json({ status: false, message: "You subscription is ongoing" });
            const response = await flutterwave_1.default.verifyPayment(trans_id);
            if (response.data.status == "successful" && response.data.amount >= amount) {
                await subscription_model_1.default.create({
                    userId: user?._id,
                    amount: response.data.amount,
                    trans_ref: trans_id,
                    tx_ref: response.data.tx_ref,
                    status: true
                });
                const n_user = await users_model_1.default.findOneAndUpdate({ _id: user?._id }, { is_subscribed: true });
                return res.status(200).json({ status: true, message: 'Request was successfull', data: n_user });
            }
            else {
                return res.status(500).json({ status: false, message: 'Request could not be comepleted, try again later' });
            }
        });
    }
}
const subscription = new SubscriptionController();
exports.default = subscription;
//# sourceMappingURL=subscription.controller.js.map