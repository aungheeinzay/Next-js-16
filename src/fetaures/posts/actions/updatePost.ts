
import { prisma } from "@/lib/prisma";
import { SINGLE_POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatingPost(_actionState:{
    message:string
},id:string,formData:FormData){
    try {
        const data={
        title:formData.get("title") as string,
        body:formData.get("body") as string
    }
    await prisma.posts.update({
        where:{id},
        data
    })
    revalidatePath(SINGLE_POSTS(id))
    //redirect(SINGLE_POSTS(id))
    return {
        message:"updated post"
    }
    } catch (error) {
       return {message:"something went wrong"}
    }
}