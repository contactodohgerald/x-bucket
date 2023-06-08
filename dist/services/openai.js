"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const default_1 = __importDefault(require("../config/default"));
const configuration = new openai_1.Configuration({
    apiKey: default_1.default.openai_api_key(),
});
const openais = new openai_1.OpenAIApi(configuration);
const generateResponse = async (prompt) => {
    try {
        const response = await openais.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0,
            max_tokens: 1024,
        });
        return response.data.choices[0].text.trim();
    }
    catch (err) {
        console.log('error', err);
        return false;
    }
};
exports.default = generateResponse;
//# sourceMappingURL=openai.js.map