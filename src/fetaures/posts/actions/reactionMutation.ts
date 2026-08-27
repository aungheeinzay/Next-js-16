"use server";

import { cacheSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";


interface ReactionActionProps {
    postId: string;
    type: "LIKE" | "DISLIKE";
    userId:string
}

export default async function reactionAction({ userId,postId, type }: ReactionActionProps) {


    if (!userId) {
        return { success: false, error: "Unauthorized" };
    }

    const reaction = await prisma.reaction.findUnique({
        where: {
            userId_postId:{
                postId,
                userId
            }
        },
    });

    if (!reaction) {
        await prisma.reaction.create({
            data: {
                userId,
                postId,
                type,
            },
        });
    } else if (reaction.type === type) {

        await prisma.reaction.delete({
            where: { id: reaction.id },
        });
    } else {

        await prisma.reaction.update({
            where: { id: reaction.id },
            data: { type },
        });
    }

}