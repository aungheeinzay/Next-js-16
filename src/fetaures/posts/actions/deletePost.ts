"use server"
import { prisma } from "@/lib/prisma"
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";


export const deletePost = async(id:string):Promise<void> =>{
  await prisma.posts.delete({
        where:{
            id
        }
    })
     revalidatePath(POSTS);
   
}

