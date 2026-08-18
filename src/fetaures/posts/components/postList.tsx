import { getPosts } from "../queries/getPosts"
import PostItem from "./postItem"
import {cacheSession} from "@/lib/session";

interface Props{
    search:string
    sort:"asc" | "desc"
}
async function PostList({search,sort}:Props) {
    const posts = await getPosts(search,sort)
    const session=await cacheSession()
    const userId = session?.user?.id
return (
     <div className='w-full flex flex-wrap gap-4'>
         {posts.length==0 && <p className={"text-center text-xl font-medium"}>No Posts</p>}
            {
                posts?.map((post)=>(
                  <PostItem loginUser={userId}  isDetail={false} key={post.id} {...post}/>
                ))
            }
        
    </div>
)
}
export default PostList