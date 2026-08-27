
import { prisma } from "@/lib/prisma";
import { postWithUser} from "../types/post";


export const getSinglePost=async(id:string):Promise<postWithUser | null>=>{
    const post = await prisma.posts.findUnique({
        where:{
            id
        },
        include:{
            user:true
        }
    })
    return post
}