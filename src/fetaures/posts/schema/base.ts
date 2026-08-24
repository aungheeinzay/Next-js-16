 import * as z from "zod"
 export const baseSchema = z.object({
    title:z.string().min(1,{message:"title must be included"}),
    status:z.enum(["IN_PROGESS","Done"]).default("IN_PROGESS"),
    body:z.string().min(3,{message:"body must be included"}),
     images:z.array(z.string())
})