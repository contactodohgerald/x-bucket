import { Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import services from "../services/service";
import { IGetUserAuthInfoRequest } from '../types/request';
import generateResponse from "../services/openai";
import Story from "../database/model/stories.model";
import Users from "../database/model/users.model";

class StoryController {
    storeStories = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            story_prompt: 'required|string|min:3'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const user = await Users.findOne({xtifier: req.user?.xtifier});

        const { story_prompt } = body

        const prompt = "hey x-bucket, tell me a humorous story about "+services.formatInput(story_prompt)

        const response = await generateResponse(prompt)

        if(!response) return res.status(403).json({status: false, message: "there was an issue with your request, please try again later"})

        await Story.create({
            userId: user?._id, prompt: prompt, body: response
        })

        return res.status(201).json({status: true, message: 'Enjoy your story', data: response})

    })

    getUserStories = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const user = await Users.findOne({xtifier: req.user?.xtifier});

        const stories = await Story.find({userId: user?._id})

        if(stories.length == 0) return res.status(403).json({status: false, message: "no stories was found", data: []})

        return res.status(200).json({status: true, message: "Stories was returned successfully", data: stories})

    })
}

const stories = new StoryController()
export default stories