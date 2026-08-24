import {Posts, User} from "../../../../generated/prisma/client";

export interface PostI{
    id:string
    title:string
    images:string[]
    body:string
}

export interface  postWithUser extends Posts{
    user:User
}