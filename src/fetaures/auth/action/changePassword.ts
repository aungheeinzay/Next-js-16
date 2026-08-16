"use server"

import {auth} from "@/lib/auth";
import {actionClient} from "@/lib/safeAction";
import {returnServerError} from "next-safe-action";
import {changePasswordSchema} from "@/fetaures/auth/schema/auth.changePassword";




export const changePasswordAction =actionClient.inputSchema(changePasswordSchema)
.action(async ({parsedInput:{newPassword,token}})=>{


   try {
       if (!token) {
           return returnServerError({
               statusCode:404,
               message:"invalid token"
           })
       }

       await auth.api.resetPassword({
           body: {
               newPassword,
               token,
           },
       });
   }catch (error:any){
       console.log(error)
       return returnServerError({message:error.message || "something went wrong"})
   }

})