import CommentForm from "@/fetaures/comment/components/commentForm";
import {creatingComment} from "@/fetaures/comment/action/createComment";
import {Dispatch, SetStateAction} from "react";
import {CommentWithUser} from "@/fetaures/comment/types/commentsT";
import {Card} from "@/components/ui/card";
interface Props{
    postId:string
    setComments:Dispatch<SetStateAction<CommentWithUser[]>>
}
export default function CreateComment({postId,setComments}:Props){
    return (
        <Card className={"w-full p-2"}>
            <CommentForm
                postId={postId}
                isUpdate={false}
                actionFn={creatingComment}
                setComments={setComments}
            />
        </Card>
    )
}