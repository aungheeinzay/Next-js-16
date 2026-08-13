
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
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

    <Card className="p-4">
           
         <CardTitle className=' font-bold flex justify-between '>
                          <p className='text-lg'>{post.title}</p>
                          <span 
                          className='text-[10px] p-2  font-mono bg-green-800 rounded-md grid place-items-center'
                          >{post.status}</span>
                        </CardTitle>
                    <CardDescription className='text-sm font-mono line-clamp-2'>{post.body}</CardDescription>
                    <CardFooter className="flex gap-2">
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