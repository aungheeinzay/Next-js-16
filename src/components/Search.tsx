"use client"
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useEffect, useRef} from "react";
import {useDebounceCallBack} from "../../hooks/useCallBack";

export default function Search(){
    const searchParams =useSearchParams()
    const ref = useRef<null | HTMLInputElement>(null)
    const pathName = usePathname()
    const params = new URLSearchParams(searchParams)
    const {replace} =useRouter()
    useEffect(()=>{
       const search = params.get("search")
        if (ref.current && search){
            ref.current.value = search
        }
    },[])
    const handleChange =useDebounceCallBack((e:ChangeEvent<HTMLInputElement>)=>{
        const value =e.target.value

        if (value){
            params.set("search",value)
        }else {
            params.delete("search")

        }
        replace(`${pathName}?${params}`,{
            scroll:false
        })
    },500)
    return (
        <div className={"py-2"}>
            <Input ref={ref} placeholder={"search with title"} onChange={handleChange}/>
        </div>
    )
}