import { getPosts } from "../queries/getPosts"
import PostItem from "./postItem"

async function PostList() {
    const posts = await getPosts()
  
return (
     <div className='flex flex-wrap gap-4'>
    
            {
                posts?.map((post)=>(
                  <PostItem key={post.id} {...post}/>
                ))
            }
        
    </div>
)
}
export default PostList