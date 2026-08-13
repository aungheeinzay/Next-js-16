
import { Posts } from "../../../../generated/prisma/client";
import { PostI } from "../types/post";
import { prisma } from "@/lib/prisma";

export const getPosts = async():Promise<Posts[]>=>{
   return prisma.posts.findMany({
    orderBy:{createdAt:"desc"}
   })
}