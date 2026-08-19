import z from "zod";

export const updateCommentSchema =z.object({
    commentId:z.string(),
    comment:z.string().min(1)
})