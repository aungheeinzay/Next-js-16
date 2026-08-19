"use client"
import { Button } from "@/components/ui/button";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface PaginationProps {
    totalPage: number
    currentPage:number
}

export default function Pagination({ totalPage,currentPage }: PaginationProps) {
    const searchParams = useSearchParams();
    const path =usePathname()
    const {replace} = useRouter()
    const handlePage=(direction:string)=>{
        const params = new URLSearchParams(searchParams)
        if (direction=="pre"){
            const value =currentPage>1 ? (currentPage-1): 1
            params.set("page",value.toString())
        }else {
            const value =totalPage>currentPage ? (currentPage+1): 1
            params.set("page",value.toString())
        }
        replace(`${path}?${params}`)
    }
    return (
        <div className={"flex gap-2"}>
            <Button
                variant={"outline"}
                onClick={()=>handlePage("pre")}
                disabled={currentPage<=1}
            >Previous</Button>
            {currentPage} of {totalPage}
            <Button
                variant={"outline"}
                onClick={()=>handlePage("next")}
                disabled={currentPage==totalPage}
            >Next</Button>
        </div>
    );
}