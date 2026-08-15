"use server"
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";
import { POSTS } from "@/path";
import { updatePostSchema } from "../schema/updatePost";
import {cacheSession} from "@/lib/session";
import {returnServerError} from "next-safe-action";
import {redirect} from "next/navigation";

export const updatingPost = actionClient
  .inputSchema(updatePostSchema)
  .action(async ({ parsedInput: { title, body, id, status } }) => {
    const session = await cacheSession()
    if (!session){
      return returnServerError({
        status:404,
        message:"unauthorized to post"
      })
    }
    try {
      await prisma.posts.update({
        where: { id },
        data: {
          title,
          body,
          status,
        },
      });
      revalidatePath(POSTS);
    } catch (error:any) {
      return returnServerError({
        status:404,
        message:error.message
      })
    }
    redirect(POSTS)
  });