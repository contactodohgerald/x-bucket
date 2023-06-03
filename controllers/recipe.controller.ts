import { Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import services from "../services/service";
import { IGetUserAuthInfoRequest } from '../types/request';
import generateResponse from "../services/openai";
import Recipe from "../database/model/recipe.model";
import Users from "../database/model/users.model";

class RecipeController {
    storeRecipes = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            recipe_prompt: 'required|string|min:3'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const user = await Users.findOne({xtifier: req.user?.xtifier});

        const { recipe_prompt } = body

        const prompt = "hey x-bucket, generate the recipe for "+services.formatInput(recipe_prompt)

        const response = await generateResponse(prompt)

        if(!response) return res.status(403).json({status: false, message: "there was an issue with your request, please try again later"})

        await Recipe.create({
            userId: user?._id, prompt: prompt, body: response
        })

        return res.status(201).json({status: true, message: 'Here is your recipe', data: response})

    })

    getUserRecipe = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const user = await Users.findOne({xtifier: req.user?.xtifier});

        const recipes = await Recipe.find({userId: user?._id})

        if(recipes.length == 0) return res.status(403).json({status: false, message: "no recipes was found", data: []})

        return res.status(200).json({status: true, message: "Recipes was returned successfully", data: recipes})

    })

}

const recipe = new RecipeController()
export default recipe