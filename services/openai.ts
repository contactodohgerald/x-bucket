import { Configuration, OpenAIApi } from "openai";
import defaults from '../config/default';

const configuration = new Configuration({
    apiKey: defaults.openai_api_key(),
});

const openais: any = new OpenAIApi(configuration)

const generateResponse = async (prompt: string) => {
    try{
        const response = await openais.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0,
            max_tokens: 1024,
        });
        return response.data.choices[0].text.trim();
    }catch(err){
        console.log('error', err)
        return false
    }
}

export default generateResponse
