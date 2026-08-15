"use server"
import { prisma } from "@/lib/prisma";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safeAction";
import { createPostSchema } from "../schema/createPost";
import {cacheSession} from "@/lib/session";
import {returnServerError} from "next-safe-action";

export const creatingPost = actionClient.inputSchema(createPostSchema)
.action(async({parsedInput:{title,body}})=>{
    const session = await cacheSession()
    if (!session){
        return returnServerError({
            status:404,
            message:"unauthorized:sign in or up to post"
        })
    }
    try {
        const data={
            title,
            body,
            userId:session.user.id
        }

        await prisma.posts.create({data})
        revalidatePath(POSTS)
    } catch (error:any) {
        return returnServerError({
            message:error.message
        })
    }
})