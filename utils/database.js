import mongoose from "mongoose";

let isConnected = false;

export const connection= async ()=>{
    mongoose.set("strictQuery",true);

    if(isConnected){
        console.log("Connection Already Established");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Connection Established!");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw error;  // Rethrow the error or handle it in a way that the application knows the DB connection failed
    }
    
}