"use server"
import { prisma } from "@/lib/prisma";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createPostSchema } from "../schema/base";


export async function creatingPost(_actionState:{message:string},formData:FormData){
    const title=formData.get("name") as string
    const body=formData.get("body") as string
    const data={title,body}
    const result  = createPostSchema.safeParse(data)
    if(!result.success)return {message:"invalid input"}
   
     await prisma.posts.create({
        data 
    })
    revalidatePath(POSTS)
    return {
        message:"post created"
    }
}