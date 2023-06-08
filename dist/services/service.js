"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sitedetails_model_1 = __importDefault(require("../database/model/sitedetails.model"));
class Services {
    formatInput(input) {
        return input.toLowerCase();
    }
    async getSiteDetails() {
        return await sitedetails_model_1.default.findOne();
    }
}
const services = new Services();
exports.default = services;
//# sourceMappingURL=service.js.map