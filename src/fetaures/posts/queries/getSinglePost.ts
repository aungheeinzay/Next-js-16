
import { prisma } from "@/lib/prisma";
import { PostI } from "../types/post";

export const getSinglePost=async(id:string):Promise<PostI | null>=>{
    const post = await prisma.posts.findUnique({
        where:{
            id
        }
    })
    return post
}