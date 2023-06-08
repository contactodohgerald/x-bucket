"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const service_1 = __importDefault(require("../services/service"));
const openai_1 = __importDefault(require("../services/openai"));
const jokes_model_1 = __importDefault(require("../database/model/jokes.model"));
const users_model_1 = __importDefault(require("../database/model/users.model"));
class JokeController {
    constructor() {
        this.storeJokes = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                joke_prompt: 'required|string|min:3'
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
            const { joke_prompt } = body;
            let prompt;
            const occcurences = service_1.default.countOccurrences(['joke', 'tell', 'about', 'generate', 'a'], joke_prompt);
            if (occcurences >= 2) {
                prompt = "hey x-bucket, " + service_1.default.formatInput(joke_prompt);
            }
            else {
                prompt = "hey x-bucket, tell me a funny joke about " + service_1.default.formatInput(joke_prompt);
            }
            const response = await (0, openai_1.default)(prompt);
            if (!response)
                return res.status(403).json({ status: false, message: "there was an issue with your request, please try again later" });
            await jokes_model_1.default.create({
                userId: user?._id, prompt: prompt, body: response
            });
            return res.status(201).json({ status: true, message: 'Enjoy your joke', data: response });
        });
        this.getUserJokes = (0, express_async_handler_1.default)(async (req, res) => {
            const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
            const jokes = await jokes_model_1.default.find({ userId: user?._id });
            if (jokes.length == 0)
                return res.status(403).json({ status: false, message: "no jokes was found", data: [] });
            return res.status(200).json({ status: true, message: "Jokes was returned successfully", data: jokes });
        });
    }
}
const jokes = new JokeController();
exports.default = jokes;
//# sourceMappingURL=joke.controller.js.map