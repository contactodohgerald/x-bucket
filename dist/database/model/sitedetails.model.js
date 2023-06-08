"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const SiteDetailSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    logo_url: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    env: {
        type: String,
        trim: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
    instagram: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false
});
const SiteDetail = mongoose_1.default.model('SiteDetails', SiteDetailSchema);
exports.default = SiteDetail;
//# sourceMappingURL=sitedetails.model.js.map