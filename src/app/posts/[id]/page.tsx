
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { getSinglePost } from "@/fetaures/posts/queries/getSinglePost";
import { Button } from "@/components/ui/button";
import DeleteBtn from "@/fetaures/posts/components/deleteBtn";
import { getPosts } from "@/fetaures/posts/queries/getPosts";
import Link from "next/link";
import { EDIT_POST } from "@/path";
import { ArrowUpRight } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "@/components/Heading";

interface Props{
    params:Promise<{id:string}>
}


async function SinglePost({params}:Props) {
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
                    <CardDescription className='text-sm font-mono '>{post.body}</CardDescription>
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



export default function Page({params}:Props){
  return (
   <div>
    <Heading title="post detials" />
     <Suspense fallback={<Skeleton className="sm:w-full w-[400px] rounded-md h-40"/>}>
    <SinglePost params={params}/>
    </Suspense>
   </div>
  )
}

// export async function generateStaticParams(){
//   const posts = await getPosts()
//   return posts.map((post)=>{
//     return {
//       id:post.id
//     }
//   })
// }