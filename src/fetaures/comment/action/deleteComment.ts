"use server"
import {prisma} from "@/lib/prisma";
import {cacheSession} from "@/lib/session";
import {revalidatePath} from "next/cache";

export async function deleteComment(id:string){

    const session =await cacheSession()
    if (!session){
       throw new Error("unauthorized");
    }
   try {
       await prisma.comment.deleteMany({
           where:{
               id,
               OR:[
                   {userId:session.user.id}, // comment owner
                   {post:{userId:session.user.id}} // post owner
               ]
           }
       })
       revalidatePath("/")
   }catch (e:any){
       console.log(e)
       throw new Error(e)
   }
}