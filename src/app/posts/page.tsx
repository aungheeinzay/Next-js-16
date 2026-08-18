
import Heading from '@/components/Heading'
import { creatingPost } from '@/fetaures/posts/actions/createPost'
import PostForm from '@/fetaures/posts/components/PostForm'

import PostList from '@/fetaures/posts/components/postList'
import PostSkeleton from '@/fetaures/posts/components/PostSkeleton'
import { Suspense} from 'react'




 function Posts() {



  return (
  <main className='w-full flex flex-wrap gap-4'>
    <Heading title='all posts'/>
    <PostForm actionFn={creatingPost} isUpdate={false}/>
  </main>
  ) 
}

export default Posts