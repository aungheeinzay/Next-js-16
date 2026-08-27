"use client";

import { useEffect, useState } from "react";
import {getReactionInfo} from "@/fetaures/posts/queries/getReaction";
import {Button} from "@/components/ui/button";
import {ThumbsDown, ThumbsUp} from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {Skeleton} from "@/components/ui/skeleton";
import {inflateRaw} from "node:zlib";
import reactionAction from "@/fetaures/posts/actions/reactionMutation";

interface ReactionProps {
    postId: string;
    userId: string | null;
}

interface ReactionState {
    like: number;
    disLike: number;
    total: number;
    userReaction: 'LIKE' | 'DISLIKE' | null;
}

export default function Reaction({ postId, userId }: ReactionProps) {
    const [reaction, setReaction] = useState<ReactionState | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchReaction = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getReactionInfo(postId, userId);

                if (isMounted) {
                    setReaction(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load reaction data");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchReaction();

        return () => {
            isMounted = false; // Cleanup function
        };
    }, [postId, userId]);

    async function  handleReaction(type:"LIKE" | "DISLIKE"){
     if (!reaction || !userId)return
        setReaction((pre)=>{
            if (!pre)return null
            const isSame = pre.userReaction === type
            const isSwithch = pre.userReaction !==null && !isSame

            if (isSame){
                return {
                    like:type =="LIKE" ? pre.like-1 : pre.like,
                    disLike:type=="DISLIKE" ? pre.disLike-1 : pre.disLike,
                    total:Math.max(0,pre.total-1),
                    userReaction:null
                }
            }
            if (isSwithch){
                return {
                    like:type=="LIKE" ? pre.like+1 : pre.like-1,
                    disLike:type=="DISLIKE" ? pre.disLike+1 : pre.disLike-1,
                    total:pre.total,
                    userReaction:type
                }
            }
            return {
                like:type==="LIKE" ? pre.like+1 : pre.like,
                disLike:type==="DISLIKE" ? pre.disLike+1 : pre.disLike,
                total:pre.total+1,
                userReaction:type
            }
        })
        await reactionAction({userId, postId, type})
    }
    if (isLoading) return <Skeleton className={"w-[80px] h-10 rounded-xl"}></Skeleton>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex items-center justify-center gap-2">
    <span className="min-w-8 text-center text-sm font-medium text-gray-600">
      {reaction?.total}
    </span>

            {userId &&   <div
                className="
        flex items-center
        overflow-hidden
        rounded-full
        border border-gray-200
        bg-white
        shadow-sm
        transition-all duration-300
        hover:shadow-md
      "
            >
                {/* Like */}
                <HoverCard openDelay={0}>
                    <HoverCardTrigger>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="
          group
          h-9
          rounded-none
          px-3
          text-gray-500
          transition-all
          duration-200
          hover:bg-blue-50
          active:scale-95
        "
                            onClick={()=>handleReaction("LIKE")}
                        >
                            <ThumbsUp
                                className="
            h-4 w-4
            transition-all duration-200
            group-hover:-translate-y-0.5
            group-hover:scale-110
          "
                            />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className={"w-fit py-1 px-2"}>
                        likes {reaction?.like}
                    </HoverCardContent>
                </HoverCard>


                {/* Divider */}
                <div className="h-5 w-px bg-gray-200" />

                {/* Dislike */}
                <HoverCard openDelay={0}>
                    <HoverCardTrigger>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="
          group
          h-9
          rounded-none
          px-3
          text-gray-500
          transition-all
          duration-200
          hover:bg-red-50
          active:scale-95
        "
                            onClick={()=>handleReaction("DISLIKE")}
                        >
                            <ThumbsDown
                                className="
            h-4 w-4
            transition-all duration-200
            group-hover:translate-y-0.5
            group-hover:scale-110
          "
                            />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent  className={"w-fit py-1 px-2"}>
                        dislikes {reaction?.disLike}
                    </HoverCardContent>
                </HoverCard>

            </div>}
        </div>

    );
}