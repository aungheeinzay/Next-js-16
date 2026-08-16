import z from "zod";

export const changePasswordSchema = z.object({
    newPassword:z.string().min(8,{message:"Password must be at least 8 characters"}),
    confirmPassword:z.string().min(8,{message:"Password must be at least 8 characters"}),
    token:z.string().nullable()
}).superRefine((data,ctx)=>{
    if (data.newPassword !== data.confirmPassword){
        ctx.addIssue({
            code:"custom",
            message:"Password not match",
            path:["confirmPassword"]
        })
    }
})