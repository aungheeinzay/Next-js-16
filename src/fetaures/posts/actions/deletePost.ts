"use server"
import { prisma } from "@/lib/prisma"
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import {cacheSession} from "@/lib/session";
import {deleteImages} from "@/fetaures/posts/actions/deleteImage";



export const deletePost = async(id:string):Promise<void> =>{
    const session = await cacheSession()
    if (!session){
        throw new Error("unauthorized to delete")
    }
    try {
    const post = await prisma.posts.findFirst({
        where:{
            id,
            userId:session.user.id
        }
    })
    if (!post)throw new Error("post not found")
    if (post.images.length>0) {
        await deleteImages(post.images)
    }
    await prisma.posts.delete({
        where:{
            id
        }
    })
    revalidatePath(POSTS);
}catch (error:any){
   throw new Error("Something went wrong")
}
    }

