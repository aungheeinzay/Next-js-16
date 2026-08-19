import {Card, CardHeader} from "@/components/ui/card";
import Heading from "@/components/Heading";
import PostForm from "@/fetaures/posts/components/PostForm";
import {getSinglePost} from "@/fetaures/posts/queries/getSinglePost";
import {updatingPost} from "@/fetaures/posts/actions/updatePost";

interface Props{
    params:Promise<{id:string}>
}
export default async function Page({params}:Props){
    const {id} = await params
    console.log("id",id)
    const  post = await getSinglePost(id)
    if (!post)return null
    return (
        <Card>
           <CardHeader>
               <Heading title={"Edit Post"}
                        description={"edit your post adn status"}/>
           </CardHeader>
            <PostForm isUpdate={true} actionFn={updatingPost} data={post}/>
        </Card>
    )
}