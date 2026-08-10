
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { getSinglePost } from "@/fetaures/posts/queries/getSinglePost";
import { Button } from "@/components/ui/button";
import DeleteBtn from "@/fetaures/posts/components/deleteBtn";
import { getPosts } from "@/fetaures/posts/queries/getPosts";
import Link from "next/link";
import { EDIT_POST } from "@/path";
import { ArrowUpRight } from "lucide-react";

interface Porps{
    params:Promise<{id:string}>
}


async function PostDetails({params}:Porps) {
    const {id} = await params;
  
    const post =await getSinglePost(id)
    if(!post){
        throw new Error("404 | not found with these id"+id)
    }
  return (
    <Card>
            <CardTitle className="font-bold text-xl">{post.title}</CardTitle>
            <CardContent className="text-sm font-medium text-gray-500">{post.body}</CardContent>
            <CardFooter className="flex gap-4">
             <DeleteBtn id={id}/>
             <Button asChild><Link href={EDIT_POST(id)}>
             <ArrowUpRight/>
             edit
             </Link></Button>
            </CardFooter>
          </Card>
  )
}

export default PostDetails

// export async function generateStaticParams(){
//   const posts = await getPosts()
//   return posts.map((post)=>{
//     return {
//       id:post.id
//     }
//   })
// }