"use server";
import { actionClient } from "@/lib/safeAction";
import { signInSchema } from "../schema";
import { auth } from "@/lib/auth";
import { returnServerError } from "next-safe-action";
import {revalidatePath} from "next/cache";
import {POSTS} from "@/path";
import {redirect} from "next/navigation";

export const signInAction = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
     await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });
        revalidatePath("/", "layout");

    } catch (error: any) {
        console.log("server error",error)
      const errorMessage = error?.message || "invalid credentials";


      return returnServerError({
          statusCode:401,
        message: errorMessage,
      });
    }
      redirect(POSTS)
  });