"use server"
import {prisma} from "@/lib/prisma";
import {CommentWithUser} from "@/fetaures/comment/types/commentsT";


export default async function getComment(postId:string):Promise<CommentWithUser[]>{
    const commentwithUser = await prisma.comment.findMany({
        where:{
            postId
        },
        include:{
            user:true
        }
    })
    return commentwithUser

}