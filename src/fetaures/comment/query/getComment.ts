"use server"
import {prisma} from "@/lib/prisma";

export default async function getComment(postId:string){
    return await prisma.comment.findMany({
        where:{
            postId
        }
    })
}