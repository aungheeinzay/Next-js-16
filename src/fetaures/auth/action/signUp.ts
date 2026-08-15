"use server"
import { actionClient } from "@/lib/safeAction";
import { signUpSchema } from "../schema";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {POSTS} from "@/path";
import { returnServerError } from "next-safe-action";

export const signUpAction = actionClient.inputSchema(signUpSchema)
.action(async({parsedInput:{email,password,name}})=>{
   try{
       await auth.api.signUpEmail({
           body:{
               email,
               name,
               password,
           }
       })

   }catch (err:any){
    console.log("server error",err)
    
     const errorMessage = err.message || "creating account fail"
     return returnServerError({
        statusCode:err.statusCode,
        message:errorMessage
     })
   }
    redirect(POSTS)
})