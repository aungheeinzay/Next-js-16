import { updatingPost } from "@/fetaures/posts/actions/updatePost"
import PostForm from "@/fetaures/posts/components/PostForm"
import { getSinglePost } from "@/fetaures/posts/queries/getSinglePost"
import { notFound } from "next/navigation"

interface Props{
    params:Promise<{id:string}>
}

async function EditPage({params}:Props) {
    const {id} =await params
    const post = await getSinglePost(id)
    if(!post)return notFound()

    
  return (
    <div>
        <PostForm actionFn={updatingPost} isUpdate={true} data={post}/>
    </div>
  )
}

export default EditPage