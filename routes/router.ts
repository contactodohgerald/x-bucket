import express from 'express'
import verifyLoginToken from '../middleware/verify.token';
import userRoles from '../middleware/user.role';
import userIsSubscribed from '../middleware/subscribed';

//import controllers
import register from '../controllers/create.xtifiers.controller';
import login from '../controllers/login.xtifiers.controller';
import siteDetails from '../controllers/sitedetails.controller';
import users from '../controllers/user.controller';
import stories from '../controllers/story.controller';
import jokes from '../controllers/joke.controller';
import recipe from '../controllers/recipe.controller';


const router = express.Router();

//
router.post('/create-xtifier', register.store)
router.post('/login-xtifier', login.store)

router.post('/create-sitedetails', verifyLoginToken, userRoles, siteDetails.store)

//user section
router.get('/get-logged-user', verifyLoginToken, users.getLoggedInUser)
router.put('/update-avatar', verifyLoginToken, users.updateAvatar)

//stories section
router.post('/store-stories', verifyLoginToken, userIsSubscribed, stories.storeStories)
router.get('/get-user-stories', verifyLoginToken, stories.getUserStories)

//jokes section
router.post('/store-jokes', verifyLoginToken, userIsSubscribed, jokes.storeJokes)
router.get('/get-user-jokes', verifyLoginToken, jokes.getUserJokes)

//recipes section
router.post('/store-recipes', verifyLoginToken, userIsSubscribed, recipe.storeRecipes)
router.get('/get-user-recipes', verifyLoginToken, recipe.getUserRecipe)

export default router