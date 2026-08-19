import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Dispatch, SetStateAction, useState} from "react";
import {CommentWithUser} from "@/fetaures/comment/types/commentsT";
import CommentForm from "@/fetaures/comment/components/commentForm";
import {updatingComment} from "@/fetaures/comment/action/updatingComment";
interface DialogProps{
    commentI:{
        id:string
        comment:string
    }
    children:React.ReactNode
    setComments:Dispatch<SetStateAction<CommentWithUser[]>>
    postId:string
}
export default function EditCommentDialog({commentI,children,setComments,postId}:DialogProps){
    const [open,setOpen]=useState(false)
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={"w-full"}>{children}</DialogTrigger>
            <DialogContent className={"w-full"}>
                <DialogHeader>
                    <DialogTitle>Edit Comment</DialogTitle>
                    <DialogDescription>
                        Edit your comment before anyone see it --
                    </DialogDescription>
                </DialogHeader>
                <CommentForm
                    isUpdate={true}
                    actionFn={updatingComment}
                    postId={postId}
                    setComments={setComments}
                    commentI={commentI}
                    onOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}