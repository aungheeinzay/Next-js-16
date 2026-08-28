import { getPosts } from "../queries/getPosts"
import PostItem from "./postItem"
import {cacheSession} from "@/lib/session";
import Pagination from "@/components/Pagination";
interface Props{
    search:string
    sort:"asc" | "desc",
    page:string | number,
    tag?:string
}
async function PostList({search,sort,page,tag}:Props) {
    const {posts,totalPage,currentPage} = await getPosts({search,sort,page,tag})
    const session=await cacheSession()
    const userId = session?.user?.id
return (
     <div className='w-full flex flex-wrap gap-4'>
         {posts.length==0 && <p className={"text-center text-xl font-medium"}>No Posts</p>}
            {
                posts?.map((post)=>(
                  <PostItem loginUser={userId}  key={post.id} {...post}/>
                ))
            }
         <Pagination totalPage={totalPage} currentPage={currentPage}/>
        
    </div>
)
}
export default PostList