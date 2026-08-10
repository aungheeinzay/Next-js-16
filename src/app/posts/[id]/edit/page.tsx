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
    if(!post){
        notFound()
    }
    const updatePost=async(_actionState:{message:string},formData:FormData)=>{
       "use server"
        return await updatingPost(_actionState,id,formData)
    }
  return (
    <div>
        <PostForm actionFn={updatePost} isUpdate={true} data={post}/>
    </div>
  )
}

export default EditPage