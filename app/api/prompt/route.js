import {connection} from "@utils/database"
import Prompt from "@models/prompt"

export const GET =async (req)=>{
    try{
        await connection();
        const promptsList=await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(promptsList),{status:200})
    }
    catch(error){
        console.log(error);
    }
}