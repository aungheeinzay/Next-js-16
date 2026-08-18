"use client"
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator";

interface SortBtnProps{
    sortData:{label:string,value:string}[],
    defaultValue:string
}
export default function SortBtn({sortData,defaultValue}:SortBtnProps){

    const searchParams=useSearchParams()
    const params = new URLSearchParams(searchParams)
    const sortValue = params.get("sort") || defaultValue
    const pathName = usePathname()
    const {replace} = useRouter()

    const handleChange=(value:string)=>{
        params.set("sort",value)
        replace(`${pathName}?${params}`,{scroll:false})
    }
    return (
      <div className={" py-2 grid gap-2"}>
          <Select value={sortValue} onValueChange={handleChange}>
              <SelectTrigger className="w-fit" >
                  <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                  {sortData.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                          {item.label}
                      </SelectItem>
                  ))}
              </SelectContent>
          </Select>
          <Separator/>
      </div>
    )
}