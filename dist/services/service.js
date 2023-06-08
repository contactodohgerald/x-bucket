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
    countOccurrences(stringList, targetString) {
        let count = 0;
        for (const str of stringList) {
            const regex = new RegExp(str, 'gi');
            const matches = targetString.match(regex);
            count += matches ? matches.length : 0;
        }
        return count;
    }
}
const services = new Services();
exports.default = services;
//# sourceMappingURL=service.js.map