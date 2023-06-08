import { Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import services from "../services/service";
import { IGetUserAuthInfoRequest } from '../types/request';
import generateResponse from "../services/openai";
import Joke from "../database/model/jokes.model";
import Users from "../database/model/users.model";

class JokeController {
    storeJokes = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            joke_prompt: 'required|string|min:3'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const user = await Users.findOne({xtifier: req.user?.xtifier});

        const { joke_prompt } = body

        let prompt: string
        const occcurences = services.countOccurrences(['joke', 'tell', 'about', 'generate', 'a'], joke_prompt)
        if(occcurences >= 2){
            prompt = "hey x-bucket, "+services.formatInput(joke_prompt)
        }else{
            prompt = "hey x-bucket, tell me a funny joke about "+services.formatInput(joke_prompt)
        } 

        const response = await generateResponse(prompt)

        if(!response) return res.status(403).json({status: false, message: "there was an issue with your request, please try again later"})

        await Joke.create({
            userId: user?._id, prompt: prompt, body: response
        })

        return res.status(201).json({status: true, message: 'Enjoy your joke', data: response})

    })

    getUserJokes= asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const user = await Users.findOne({xtifier: req.user?.xtifier});

        const jokes = await Joke.find({userId: user?._id})

        if(jokes.length == 0) return res.status(403).json({status: false, message: "no jokes was found", data: []})

        return res.status(200).json({status: true, message: "Jokes was returned successfully", data: jokes})

    })

}

const jokes = new JokeController()
export default jokes