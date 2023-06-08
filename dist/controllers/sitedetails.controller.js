"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const sitedetails_model_1 = __importDefault(require("../database/model/sitedetails.model"));
class SiteDetailsController {
    constructor() {
        this.store = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                email: 'required|string',
                env: 'required|string',
                address: 'required|string',
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const { email, env, address, logo_url, twitter, instagram } = body;
            const siteExists = await sitedetails_model_1.default.findOne();
            if (siteExists) {
                siteExists.email = email;
                siteExists.env = env;
                siteExists.address = address;
                siteExists.logo_url = logo_url;
                siteExists.twitter = twitter;
                siteExists.instagram = instagram;
                await siteExists.save();
                return res.status(200).json({ status: true, message: "SiteDetail updated successfully", data: siteExists });
            }
            else {
                const storeSiteDetails = await sitedetails_model_1.default.create({
                    email, env, address, logo_url, twitter, instagram
                });
                return res.status(201).json({ status: true, message: "SiteDetail created successfully", data: storeSiteDetails });
            }
        });
    }
}
const siteDetails = new SiteDetailsController();
exports.default = siteDetails;
//# sourceMappingURL=sitedetails.controller.js.map