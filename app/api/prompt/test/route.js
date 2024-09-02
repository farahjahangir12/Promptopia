import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const POST= async (req)=>{
    try{
    const {prompt}=await req.json()
    const result = await model.generateContent(prompt);
    return new Response(JSON.stringify({result:result.response.text()}),{
    status:201 });
    }
    catch(error){
     console.log(error)
    }
    

}

