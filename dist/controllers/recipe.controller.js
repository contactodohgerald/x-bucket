"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const service_1 = __importDefault(require("../services/service"));
const openai_1 = __importDefault(require("../services/openai"));
const recipe_model_1 = __importDefault(require("../database/model/recipe.model"));
const users_model_1 = __importDefault(require("../database/model/users.model"));
class RecipeController {
    constructor() {
        this.storeRecipes = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                recipe_prompt: 'required|string|min:3'
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
            const { recipe_prompt } = body;
            let prompt;
            const occcurences = service_1.default.countOccurrences(['recipe', 'on', 'the', 'of', 'generate', 'a'], recipe_prompt);
            if (occcurences >= 2) {
                prompt = "hey x-bucket, " + service_1.default.formatInput(recipe_prompt);
            }
            else {
                prompt = "hey x-bucket, generate the recipe for " + service_1.default.formatInput(recipe_prompt);
            }
            const response = await (0, openai_1.default)(prompt);
            if (!response)
                return res.status(403).json({ status: false, message: "there was an issue with your request, please try again later" });
            await recipe_model_1.default.create({
                userId: user?._id, prompt: prompt, body: response
            });
            return res.status(201).json({ status: true, message: 'Here is your recipe', data: response });
        });
        this.getUserRecipe = (0, express_async_handler_1.default)(async (req, res) => {
            const user = await users_model_1.default.findOne({ xtifier: req.user?.xtifier });
            const recipes = await recipe_model_1.default.find({ userId: user?._id });
            if (recipes.length == 0)
                return res.status(403).json({ status: false, message: "no recipes was found", data: [] });
            return res.status(200).json({ status: true, message: "Recipes was returned successfully", data: recipes });
        });
    }
}
const recipe = new RecipeController();
exports.default = recipe;
//# sourceMappingURL=recipe.controller.js.map