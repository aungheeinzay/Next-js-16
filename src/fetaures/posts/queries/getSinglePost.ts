
import { prisma } from "@/lib/prisma";
import { PostI } from "../types/post";
import { Posts } from "../../../../generated/prisma/client";

export const getSinglePost=async(id:string):Promise<Posts | null>=>{
    const post = await prisma.posts.findUnique({
        where:{
            id
        }
    })
    return post
}