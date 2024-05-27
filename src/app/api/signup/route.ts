import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

export async function POST(request:Request){
    await dbConnect()

    try{
        const {username,email,password}=await request.json();
        

    }catch(error){
        console.log("Error registering user!",error)
        return Response.json({
          success: false,
          message: "Error registering user!",
          status:500
        });
    }
}