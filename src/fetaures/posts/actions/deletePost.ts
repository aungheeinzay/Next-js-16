"use server"
import { prisma } from "@/lib/prisma"
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deletePost = async(id:string):Promise<{message:string}> =>{
    const post =  await prisma.posts.delete({
        where:{
            id
        }
    })
     revalidatePath(POSTS);
        redirect(POSTS)
    return {
        message:`${post.title} is deleted`
    }
}