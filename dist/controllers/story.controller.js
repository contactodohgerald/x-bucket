"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const service_1 = __importDefault(require("../services/service"));
const openai_1 = __importDefault(require("../services/openai"));
const stories_model_1 = __importDefault(require("../database/model/stories.model"));
const users_model_1 = __importDefault(require("../database/model/users.model"));
class StoryController {
    constructor() {
        this.storeStories = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                story_prompt: 'required|string|min:3'
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
            const { story_prompt } = body;
            const prompt = "hey x-bucket, tell me a humorous story about " + service_1.default.formatInput(story_prompt);
            const response = await (0, openai_1.default)(prompt);
            if (!response)
                return res.status(403).json({ status: false, message: "there was an issue with your request, please try again later" });
            await stories_model_1.default.create({
                userId: user?._id, prompt: prompt, body: response
            });
            return res.status(201).json({ status: true, message: 'Enjoy your story', data: response });
        });
        this.getUserStories = (0, express_async_handler_1.default)(async (req, res) => {
            const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
            const stories = await stories_model_1.default.find({ userId: user?._id });
            if (stories.length == 0)
                return res.status(403).json({ status: false, message: "no stories was found", data: [] });
            return res.status(200).json({ status: true, message: "Stories was returned successfully", data: stories });
        });
    }
}
const stories = new StoryController();
exports.default = stories;
//# sourceMappingURL=story.controller.js.map