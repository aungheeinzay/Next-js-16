 import * as z from "zod"
 export const createPostSchema = z.object({
    title:z.string().min(1,{message:"title must be included"}),
    body:z.string().min(3,{message:"body must be included"})
})