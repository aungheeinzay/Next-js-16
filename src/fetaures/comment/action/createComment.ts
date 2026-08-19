
"use server"
import { prisma } from "@/lib/prisma";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safeAction";
import {cacheSession} from "@/lib/session";
import {returnServerError} from "next-safe-action";
import {createCommentSchema} from "@/fetaures/comment/schema/createComment";

export const creatingComment = actionClient.inputSchema(createCommentSchema)
    .action(async({parsedInput:{postId,comment}})=>{
        const session = await cacheSession()
        if (!session){
            return returnServerError({
                status:404,
                message:"unauthorized:no account to comment"
            })
        }
        try {
            const data={
                postId,
                comment,
                userId:session.user.id
            }

            const createdComment = await prisma.comment.create({data,include:{user:true}})
            return createdComment

        } catch (error:any) {
            return returnServerError({
                message:error.message
            })
        }
    })