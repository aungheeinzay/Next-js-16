"use server"
import {actionClient} from "@/lib/safeAction";
import z from "zod";
import {auth} from "@/lib/auth";
import {resetPasswordSchema} from "@/fetaures/auth/schema/auth.resetPassword";

export const resetPasswordAction = actionClient.inputSchema(resetPasswordSchema)
.action(async ({parsedInput:{email}})=>{
   try {
       await auth.api.requestPasswordReset({
           body: {
               email,
               redirectTo:`${process.env.BETTER_AUTH_URL}/auth/changePassword`
           },
       })
   }catch (e){
       console.log(e)
       throw new Error("resetPassword:Something went wrong")
   }
})