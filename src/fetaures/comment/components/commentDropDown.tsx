
import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Dispatch, JSX, SetStateAction} from "react";
import {SquarePen, Trash2} from "lucide-react";
import {deleteComment} from "@/fetaures/comment/action/deleteComment";
import EditCommentDialog from "@/fetaures/comment/components/editCommentDialog";
import {CommentWithUser} from "@/fetaures/comment/types/commentsT";
interface DropDownProps{
    render:()=>JSX.Element
    id:string
    setComments:Dispatch<SetStateAction<CommentWithUser[]>>
    postId:string
    commentI:{
        id:string
        comment:string
    }
    commentOwner:boolean
}
export default function CommentDropDown({render,id,setComments,commentI,postId,commentOwner}:DropDownProps){
async function handleDelete(){
   try {
       await deleteComment(id)
       setComments((pre)=>pre.filter((c)=>c.id!==id))
   }catch (e){
       console.log(e)
   }

}
return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {render()}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                commentOwner &&
                <EditCommentDialog
                    setComments={setComments}
                    commentI={commentI}
                    postId={postId}
                ><DropdownMenuItem
                    onSelect={(e)=>e.preventDefault()}
                    className={"flex gap-2"}><SquarePen/> <span>edit</span></DropdownMenuItem></EditCommentDialog>
            }
            <DropdownMenuItem onClick={handleDelete} className={"flex gap-2 text-red-500"}><Trash2/> <span>delete</span></DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)
}