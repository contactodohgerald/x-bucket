"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import Flutterwave from 'flutterwave-node-v3';
const Flutterwave = require('flutterwave-node-v3');
const default_1 = __importDefault(require("../config/default"));
const flw = new Flutterwave(String(default_1.default.flw_public_key()), String(default_1.default.flw_secret_key()));
class PaymentHandler {
    constructor() {
        this.verifyPayment = async (trans_ref) => {
            return await flw.Transaction.verify({ id: trans_ref });
        };
    }
}
const flutterwave = new PaymentHandler();
exports.default = flutterwave;
//# sourceMappingURL=flutterwave.js.map