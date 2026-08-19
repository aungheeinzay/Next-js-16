"use client"
import {Dispatch, SetStateAction, useState} from "react";
import { Button } from "@/components/ui/button";
import {ChevronsDown, ChevronsUp, CircleEllipsis, Ellipsis, LoaderCircle} from "lucide-react";
import {
    Avatar,

    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import getComment from "@/fetaures/comment/query/getComment";
import CommentDropDown from "@/fetaures/comment/components/commentDropDown";
import {CommentWithUser} from "@/fetaures/comment/types/commentsT"; // သို့မဟုတ် Server Action

interface CommentBtnProps {
    id: string;
    isLoading:boolean
    comments:CommentWithUser[]
    setComments:Dispatch<SetStateAction<CommentWithUser[]>>
    setLoading:(loading:boolean)=>void
    currentUser:boolean
    loginUser:string | undefined
}

export default function CommentBtn({ id,isLoading,setLoading,setComments,comments,currentUser,loginUser }: CommentBtnProps) {

    const [showComments, setShowComments] = useState(false);


    const handleFetchComments = async () => {
        if (showComments) {
            setShowComments(false);
            return;
        }

        try {
            setLoading(true);

            const data = await getComment(id) as CommentWithUser[];
            setComments(data || []);
            setShowComments(true);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full relative">
          <div className={""}>
              <Button
                  type="button"
                  variant={"outline"}
                  className={"flex gap-2 items-center w-fit rounded-full"}
                  onClick={handleFetchComments}
                  disabled={isLoading}
              >

                 <>
                     {isLoading ?
                             <LoaderCircle className="animate-spin" size={16} />
                         :
                         showComments ? <ChevronsUp size={16}/>  : <ChevronsDown size={16} />
                             }
                 </>
              </Button>
          </div>


            {showComments && (
                <div className="mt-2 p-2  flex flex-col gap-2">
                    {comments.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No comments found.</p>
                    ) : (
                        comments.map((item) => (
                            <div key={item.id} className="text-sm p-2 my-2 border rounded-md group relative flex gap-2">
                                <div className={"flex justify-between"}>
                                    <Avatar>
                                        <AvatarImage src={item?.user?.image || undefined} alt="user photo" />
                                        <AvatarFallback>{item?.user?.name.toUpperCase().substring(0,2)}</AvatarFallback>
                                        {/*<AvatarBadge className="bg-green-600 dark:bg-green-800" />*/}
                                    </Avatar>
                                    {
                                        (loginUser==item.user.id || currentUser) &&
                                        <CommentDropDown
                                            id={item.id}
                                            setComments={setComments}
                                            postId={id}
                                            commentI={{
                                                id:item.id,
                                                comment:item.comment
                                            }}
                                            commentOwner={loginUser==item.user.id}
                                            render={()=> <Button variant={"outline"} className={"opacity-0 group-hover:opacity-100 absolute top-1 right-2 group-hover:bg-gray-500 rounded-full" }>
                                                <Ellipsis />
                                            </Button>}/>
                                    }
                                </div>
                              <div>
                                  <p className={"text-md font-bold"}>{item?.user?.name}</p>
                                  <p>{item.comment}</p>
                              </div>

                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}