"use server"

import { prisma } from "@/lib/prisma";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safeAction";
import { createPostSchema } from "../schema/createPost";
import { cacheSession } from "@/lib/session";
import { returnServerError } from "next-safe-action";
import { extrectHash } from "@/lib/extrectHash";

export const creatingPost = actionClient
    .inputSchema(createPostSchema)
    .action(async ({ parsedInput: { title, body, images } }) => {

        const session = await cacheSession();

        if (!session) {
            return returnServerError({
                status: 404,
                message: "unauthorized: sign in or up to post"
            });
        }

        const tags = extrectHash(body.toString());

        try {

             await prisma.$transaction(async (tx) => {

                // 1. Create Post
                const post = await tx.posts.create({
                    data: {
                        title,
                        body,
                        userId: session.user.id,
                        images,
                    }
                });

                // 2. Handle hashtags
                for (const tagName of tags) {

                    const tag = await tx.tag.upsert({
                        where: {
                            slug: tagName,
                        },

                        create: {
                            name: tagName,
                            slug: tagName,
                            usageCount: 1,
                        },

                        update: {
                            usageCount: {
                                increment: 1,
                            },
                        },
                    });

                    // 3. Connect Post ↔ Tag
                    await tx.postTag.create({
                        data: {
                            postId: post.id,
                            tagId: tag.id,
                        },
                    });
                }


            });

            revalidatePath(POSTS);

        } catch (error: any) {

            return returnServerError({
                message: error.message
            });

        }
    });