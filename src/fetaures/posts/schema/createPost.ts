import { baseSchema } from "./base";

export const createPostSchema =baseSchema.omit({status:true})