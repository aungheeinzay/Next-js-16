import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

 function SkeletonPost() {
    return (
        <Card className='w-full p-4 h-[300px] flex flex-wrap justify-start gap-4'>

            <div className="w-full space-y-2">
                <Skeleton className="h-3 w-28" /> {/* Author name */}
                <div className='flex justify-between items-center'>
                    <Skeleton className="h-6 w-48" /> {/* Title */}
                    <Skeleton className="h-5 w-20 rounded-md" /> {/* Status Badge */}
                </div>
            </div>

            {/* Post Body (စာသား ၂ ကြောင်းစာ) */}
            <div className="w-full space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Action Buttons (Details, Edit, Delete နှင့် Comments ခလုတ်များ) */}
            <div className={"flex w-full justify-between items-center"}>
                <div className={"flex gap-2 items-center"}>
                    <Skeleton className="h-9 w-20 rounded-md" /> {/* details */}
                    <Skeleton className="h-9 w-16 rounded-md" /> {/* edit */}
                    <Skeleton className="h-9 w-16 rounded-md" /> {/* delete */}
                </div>

            </div>

            <Separator className="my-1" />
            <Skeleton className="h-9 w-24 rounded-full" /> {/* comments toggle */}
            {/* Comment Input Box ပုံစံ */}
            <div className="w-full flex gap-2 items-center">
                <Skeleton className="h-10 w-full rounded-md" /> {/* Input field */}
                <Skeleton className="h-10 w-20 rounded-md" /> {/* Comment button */}
            </div>
        </Card>
    );
}

export default function PostSkeleton(){
    return (
       <div className={"grid gap-4"}>
           <SkeletonPost/>
           <SkeletonPost/>
           <SkeletonPost/>
       </div>
    )
}