import z from "zod";

export const authBaseSchema = z.object({
    email:z.email(),
    password:z.string().min(8,{message:"password must bes at least 8 characters"})
})