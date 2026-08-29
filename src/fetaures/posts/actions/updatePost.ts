 "use server"
// import { prisma } from "@/lib/prisma";
// import { actionClient } from "@/lib/safeAction";
// import { revalidatePath } from "next/cache";
// import { POSTS } from "@/path";
// import { updatePostSchema } from "../schema/updatePost";
// import {cacheSession} from "@/lib/session";
// import {returnServerError} from "next-safe-action";
// import {redirect} from "next/navigation";
//
// export const updatingPost = actionClient
//   .inputSchema(updatePostSchema)
//   .action(async ({ parsedInput: { title, body, id, status,images } }) => {
//     const session = await cacheSession()
//     if (!session){
//       return returnServerError({
//         status:404,
//         message:"unauthorized to post"
//       })
//     }
//     try {
//       await prisma.posts.update({
//         where: { id },
//         data: {
//           title,
//           body,
//           status,
//             images
//         },
//       });
//       revalidatePath("/");
//     } catch (error:any) {
//       return returnServerError({
//         status:404,
//         message:error.message
//       })
//     }
//
//   });

import {actionClient} from "@/lib/safeAction";
import {updatePostSchema} from "@/fetaures/posts/schema/updatePost";
import {cacheSession} from "@/lib/session";
import {returnServerError} from "next-safe-action";
import {prisma} from "@/lib/prisma";
import {extrectHash} from "@/lib/extrectHash";
import {revalidatePath} from "next/cache";

export const  updatingPost=actionClient.inputSchema(updatePostSchema)
.action(async ({parsedInput:{title,body,images,status,id}})=>{
const session = await cacheSession()
    if (!session){
        return returnServerError({
        message:"unauthorized"
        })
    }
    const tags = extrectHash(body.toString())
    try {
        await prisma.$transaction(async (tx)=>{
            const post = await tx.posts.findUnique({
                where:{
                    id
                },
                include:{
                 tags:{
                     include:{
                         tag:true
                     }
                 }
                }
            })
            if (!post || post.userId!==session.user.id){
                throw new Error("cannot delete | unauthorized")
            }
            const  slugs = post.tags.map(t=>t.tag.slug)
          const tagToRemove = post.tags.filter((tg)=>!tags.includes(tg.tag.slug))
            const newTags = tags.filter((tg)=>!slugs.includes(tg))

            for (const tag of tagToRemove){
                await tx.postTag.deleteMany({where:{postId:id,tagId:tag.tagId}})
                await tx.tag.update({
                    where:{id:tag.tagId},
                    data:{usageCount:{decrement:1}}
                })
            }
            for (const item of newTags){

               const tag = await tx.tag.upsert({
                   where:{slug:item},
                   create:{slug:item,name:item,usageCount:1},
                   update:{usageCount:{increment:1}}
               })
                await tx.postTag.create({
                  data:{
                      postId:id,
                      tagId:tag.id
                  }
                })
            }
            await tx.posts.update({
                where:{id},
                data:{
                    title,
                    body,
                    images,
                    status
                }
            })
        })

    revalidatePath("/")
    }catch (e:any){
        console.log(e)
        throw new Error("something went wrong")
    }
})