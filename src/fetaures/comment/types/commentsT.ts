import {User,Comment} from "../../../../generated/prisma/client";

export interface CommentWithUser extends Comment{
    user:User
}
