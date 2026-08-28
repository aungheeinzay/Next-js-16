
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request:NextRequest){
    const {searchParams}=new URL(request.url)
    const query = searchParams.get("query")?.trim().toString().toLocaleLowerCase()
    if (!query){
        return NextResponse.json([])
    }
    const tags =await prisma.tag.findMany({
       where:{
           slug:{
               startsWith:query
           },
       },
        select:{
           id:true,
           name:true,
            slug:true,
            usageCount:true
        },
        orderBy:{
           usageCount:"desc"
        },
        take:8
    })
    return NextResponse.json(tags)
}