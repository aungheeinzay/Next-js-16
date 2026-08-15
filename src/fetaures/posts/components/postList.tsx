import { getPosts } from "../queries/getPosts"
import PostItem from "./postItem"
import {getSession} from "@/lib/session";

async function PostList() {
    const posts = await getPosts()
    const session=await getSession()
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