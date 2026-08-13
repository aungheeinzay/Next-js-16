"use server"
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";
import { POSTS } from "@/path";
import { updatePostSchema } from "../schema/updatePost";

export const updatingPost = actionClient
  .inputSchema(updatePostSchema)
  .action(async ({ parsedInput: { title, body, id, status } }) => {
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
      return { success: true };
    } catch (error) {
      console.log("server error", error);
      throw new Error("something went wrong");
    }
  });