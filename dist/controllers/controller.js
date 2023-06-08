"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const service_1 = __importDefault(require("../services/service"));
const newsletter_model_1 = __importDefault(require("../database/model/newsletter.model"));
const enquiry_model_1 = __importDefault(require("../database/model/enquiry.model"));
const users_model_1 = __importDefault(require("../database/model/users.model"));
class Controller {
    constructor() {
        this.getLoggedInUser = (0, express_async_handler_1.default)(async (req, res) => {
            const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
            if (!user)
                return res.status(503).json({ status: false, mesaage: 'User not found' });
            return res.status(200).json({ status: true, message: 'User returned successfully', data: user });
        });
        this.storeNewsletter = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                email: 'required|string',
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const { email } = body;
            const new_email = service_1.default.formatInput(email);
            const emailExists = await newsletter_model_1.default.findOne({ email: new_email });
            if (emailExists)
                return res.status(400).json({ status: false, message: "Email already exist, try a different email" });
            await newsletter_model_1.default.create({
                email: new_email,
            });
            return res.status(201).json({ status: true, message: "Email was successfully added to newsletter" });
        });
        this.getNewsletters = (0, express_async_handler_1.default)(async (req, res) => {
            const newsletters = await newsletter_model_1.default.find();
            if (newsletters.length == 0)
                return res.status(403).json({ status: false, message: "no newsletter was found", data: [] });
            return res.status(200).json({ status: true, message: "Newsletter was returned successfully", data: newsletters });
        });
        this.storeEnquiry = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                email: 'required|string',
                subject: 'required|string',
                message: 'required|string',
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const { name, email, subject, message } = body;
            await enquiry_model_1.default.create({
                name: service_1.default.formatInput(name),
                email: service_1.default.formatInput(email),
                subject: subject,
                message: message
            });
            return res.status(201).json({ status: true, message: "Enquiry was sent successfully" });
        });
        this.getAllEnquiry = (0, express_async_handler_1.default)(async (req, res) => {
            const enquiries = await enquiry_model_1.default.find();
            if (enquiries.length == 0)
                return res.status(403).json({ status: false, message: "no enquiries was found", data: [] });
            return res.status(200).json({ status: true, message: "Enquiry was returned successfully", data: enquiries });
        });
    }
}
const controller = new Controller();
exports.default = controller;
//# sourceMappingURL=controller.js.map