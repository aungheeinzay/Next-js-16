"use server"
import { prisma } from "@/lib/prisma"
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import {getSession} from "@/lib/session";


export const deletePost = async(id:string):Promise<void> =>{
    const session = await getSession()
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

