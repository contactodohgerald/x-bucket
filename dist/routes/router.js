"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_token_1 = __importDefault(require("../middleware/verify.token"));
const user_role_1 = __importDefault(require("../middleware/user.role"));
const subscribed_1 = __importDefault(require("../middleware/subscribed"));
//import controllers
const create_xtifiers_controller_1 = __importDefault(require("../controllers/create.xtifiers.controller"));
const login_xtifiers_controller_1 = __importDefault(require("../controllers/login.xtifiers.controller"));
const sitedetails_controller_1 = __importDefault(require("../controllers/sitedetails.controller"));
const story_controller_1 = __importDefault(require("../controllers/story.controller"));
const joke_controller_1 = __importDefault(require("../controllers/joke.controller"));
const recipe_controller_1 = __importDefault(require("../controllers/recipe.controller"));
const subscription_controller_1 = __importDefault(require("../controllers/subscription.controller"));
const controller_1 = __importDefault(require("../controllers/controller"));
const router = express_1.default.Router();
//
router.post('/create-xtifier', create_xtifiers_controller_1.default.store);
router.post('/login-xtifier', login_xtifiers_controller_1.default.store);
router.post('/create-sitedetails', verify_token_1.default, user_role_1.default, sitedetails_controller_1.default.store);
//user section
router.get('/get-logged-user', verify_token_1.default, controller_1.default.getLoggedInUser);
//stories section
router.post('/store-stories', verify_token_1.default, subscribed_1.default, story_controller_1.default.storeStories);
router.get('/get-user-stories', verify_token_1.default, story_controller_1.default.getUserStories);
//jokes section
router.post('/store-jokes', verify_token_1.default, subscribed_1.default, joke_controller_1.default.storeJokes);
router.get('/get-user-jokes', verify_token_1.default, joke_controller_1.default.getUserJokes);
//recipes section
router.post('/store-recipes', verify_token_1.default, subscribed_1.default, recipe_controller_1.default.storeRecipes);
router.get('/get-user-recipes', verify_token_1.default, recipe_controller_1.default.getUserRecipe);
//subscription section
router.post('/subscribe-user', verify_token_1.default, subscription_controller_1.default.subscribeUser);
//newsletter section
router.post('/newsletter', controller_1.default.storeNewsletter);
router.get('/get-newsletters', verify_token_1.default, user_role_1.default, controller_1.default.getNewsletters);
//enquiry section
router.post('/send-enquiry', controller_1.default.storeEnquiry);
router.get('/get-enquiries', verify_token_1.default, user_role_1.default, controller_1.default.getAllEnquiry);
exports.default = router;
//# sourceMappingURL=router.js.map