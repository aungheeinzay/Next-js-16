

import { prisma } from "@/lib/prisma";
import {postWithUser} from "@/fetaures/posts/types/post";


export const getPosts = async():Promise<postWithUser[]>=>{
   return prisma.posts.findMany({
    orderBy:{createdAt:"desc"},
       include:{
        user:true
       }
   })
}