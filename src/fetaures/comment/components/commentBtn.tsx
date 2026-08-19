"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {ChevronsDown, ChevronsUp, LoaderCircle} from "lucide-react";
import {Comment} from "../../../../generated/prisma/client";
import getComment from "@/fetaures/comment/query/getComment"; // သို့မဟုတ် Server Action

interface CommentBtnProps {
    id: string;
}

export default function CommentBtn({ id }: CommentBtnProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [showComments, setShowComments] = useState(false);


    const handleFetchComments = async () => {
        if (showComments) {
            setShowComments(false);
            return;
        }

        try {
            setIsLoading(true);

            const data = await getComment(id) as Comment[];
            setComments(data || []);
            setShowComments(true);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        } finally {
            setIsLoading(false);
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
                <div className="mt-2 p-2 border rounded-md bg-muted/50 flex flex-col gap-2">
                    {comments.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No comments found.</p>
                    ) : (
                        comments.map((item) => (
                            <div key={item.id} className="text-sm p-1 border-b last:border-none">
                                <p>{item.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}