"use server"
import { prisma } from "@/lib/prisma";

import { actionClient } from "@/lib/safeAction";
import { cacheSession } from "@/lib/session";
import { returnServerError } from "next-safe-action";
import {updateCommentSchema} from "@/fetaures/comment/schema/updateComment";


export const updatingComment = actionClient.inputSchema(updateCommentSchema)
    .action(async ({ parsedInput: { commentId, comment } }) => {
        const session = await cacheSession();
        if (!session) {
            return returnServerError({
                status: 404,
                message: "unauthorized: no account to comment"
            });
        }

        try {

            const haveComment = await prisma.comment.findUnique({
                where: { id: commentId, userId: session.user.id }
            });

            if (!haveComment) {
                return returnServerError({
                    message: "cannot update comment"
                });
            }


            const com = await prisma.comment.update({
                where: {
                    id: commentId,
                userId: session.user.id},
                data: { comment },
                include:{user:true}
            });


            return com

        } catch (error: any) {
            return returnServerError({
                message: error.message
            });
        }
    });