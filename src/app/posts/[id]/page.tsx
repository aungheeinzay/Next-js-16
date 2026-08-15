

import { getSinglePost } from "@/fetaures/posts/queries/getSinglePost";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "@/components/Heading";
import PostItem from "@/fetaures/posts/components/postItem";

interface Props{
    params:Promise<{id:string}>
}


async function SinglePost({params}:Props) {
    const {id} = await params;
  
    const userPost =await getSinglePost(id)
    if(!userPost){
        throw new Error("404 | not found with these id"+id)
    }
  return (
      <PostItem isDetail={true} {...userPost}/>
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