"use server"
import { prisma } from "@/lib/prisma"
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import {cacheSession} from "@/lib/session";



export const deletePost = async(id:string):Promise<void> =>{
    const session = await cacheSession()
    if (!session){
        throw new Error("unauthorized to delete")
    }
  await prisma.posts.delete({
        where:{
            id,
            userId:session.user.id
        }
    })
     revalidatePath(POSTS);
   
}

