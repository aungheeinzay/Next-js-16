
import { PostI } from "../types/post";
import { prisma } from "@/lib/prisma";

export const getPosts = async():Promise<PostI[]>=>{
   return prisma.posts.findMany({
    orderBy:{createdAt:"desc"}
   })
}