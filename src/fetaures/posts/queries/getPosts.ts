

import { prisma } from "@/lib/prisma";
import {postWithUser} from "@/fetaures/posts/types/post";
interface getPostPara{
    search:string
    sort:"asc" | "desc"
    page:number | string
}

interface PaginatedPosts{
    total:number
    totalPage:number,
    currentPage:number
    posts:postWithUser[]
}
export const getPosts = async ({ search, sort, page }: getPostPara): Promise<PaginatedPosts> => {

    const POST_PER_PAGE = 4;
    const currentPage =search ? 1 : Number(page)
    const skip = (currentPage - 1) * POST_PER_PAGE;


    const where = search ? {
        title: {
            contains: search,
            mode: 'insensitive' as const
        }
    } : {};

    const [total, posts] = await prisma.$transaction([
        prisma.posts.count({ where }),
        prisma.posts.findMany({
            orderBy: { createdAt: sort },
            where,
            include: { user: true },
            take: POST_PER_PAGE,
            skip
        })
    ]);

    const totalPage = Math.ceil(total / POST_PER_PAGE);
    return { total,totalPage, posts,currentPage:search ? 1 : currentPage };
};