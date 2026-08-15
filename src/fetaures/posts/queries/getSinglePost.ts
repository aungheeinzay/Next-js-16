
import { prisma } from "@/lib/prisma";
import {PostI, postWithUser} from "../types/post";
import { Posts } from "../../../../generated/prisma/client";

export const getSinglePost=async(id:string):Promise<postWithUser | null>=>{
    const post = await prisma.posts.findUnique({
        where:{
            id
        },
        include:{
            user:true
        }
    })
    return post
}