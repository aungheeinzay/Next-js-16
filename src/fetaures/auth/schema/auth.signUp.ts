import z from "zod";
import { authBaseSchema } from "./base.auth";

export const signUpSchema=authBaseSchema.extend({
    name:z.string().min(3).max(20),
    confirmPassword:z.string().min(6)
}).superRefine((data,ctx)=>{
    if(data.password !== data.confirmPassword){
        ctx.addIssue({
            code:"custom",
            message:"Password not match",
            path:["confirmPassword"]
        })
    }
})