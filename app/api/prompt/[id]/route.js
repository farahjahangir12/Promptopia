"use client";

import {connection} from "@utils/database";
import Prompt from "@models/prompt";

export const GET =async (req,{params})=>{
    try{
        await connection();
        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt){
          return new Response("Prompt not found!")
        }
        return new Response(JSON.stringify(prompt),{status:200})
    }
    catch(error){
        console.log(error);
    }

}

export const PATCH = async(req,{params}) =>{
    const {prompt,tag}=await req.json();
    try{
    await connection();

    const existingPost= await Prompt.findById(params.id)
    if(!existingPost){
        return new Response("Prompt not found!")
      }
    existingPost.prompt=prompt;
    existingPost.tag=tag;
    await existingPost.save();
    return new Response(JSON.stringify(existingPost),{status:200})
    }
    catch(error)
    {
        console.log(error);
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connection();
       await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Error deleting prompt", { status: 500 });
    }
};
