"use server"

import { prisma } from "@/lib/prisma";
export async function getReactionInfo(postId: string,userId:string | null) {
    const userReactionPromise = userId
        ? prisma.reaction.findUnique({
            where: {
                userId_postId: { userId, postId }
            },
            select: { type: true }
        })
        : null;
    const [counts,userReaction] =await Promise.all([
        prisma.reaction.groupBy({
            by:["type"],
            where:{
                postId
            },
            _count:{
                _all:true
            }
        }),
       userReactionPromise
    ])

    const like = counts.find((c) => c.type === "LIKE")?._count._all ?? 0;
    const disLike = counts.find((c) => c.type === "DISLIKE")?._count._all ?? 0;

    return {
        total: like + disLike,
        like,
        disLike,
        userReaction:userReaction ? userReaction.type : null
    };
}