import CommentForm from "@/fetaures/comment/components/commentForm";
import {creatingComment} from "@/fetaures/comment/action/createComment";
interface Props{
    postId:string
}
export default function CreateComment({postId}:Props){
    return (
        <div>
            <CommentForm postId={postId}  isUpdate={false} actionFn={creatingComment}/>
        </div>
    )
}