import z from "zod";
import { baseSchema } from "./base";

export const updatePostSchema =baseSchema.extend({
    id:z.string().min(1,{message:"id is required"})
})