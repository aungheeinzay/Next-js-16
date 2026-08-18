

import { prisma } from "@/lib/prisma";
import {postWithUser} from "@/fetaures/posts/types/post";


export const getPosts = async(search:string,sort:"asc" | "desc"):Promise<postWithUser[]>=>{
   return prisma.posts.findMany({
    orderBy:{createdAt:sort},
       where:{
        title:{
            contains:search,
            mode:"insensitive"
        }
       },
       include:{
        user:true
       }
   })
}