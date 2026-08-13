"use server"
import { prisma } from "@/lib/prisma";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safeAction";
import { createPostSchema } from "../schema/createPost";

export const creatingPost = actionClient.inputSchema(createPostSchema)
.action(async({parsedInput:{title,body}})=>{
    try {
        const data={
            title,body
        }

        await prisma.posts.create({data})
        revalidatePath(POSTS)
    } catch (error) {
        throw new Error("something went wrong!")
    }
})