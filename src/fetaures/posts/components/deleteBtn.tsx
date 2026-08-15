"use client"

import { Button } from '@/components/ui/button'
import { deletePost } from '../actions/deletePost'
import { useState } from 'react'
import { POSTS } from '@/path'
import { toast } from '@/components/toaster/toast'
import { useRouter } from 'next/navigation'
import {Trash2} from "lucide-react";



function DeleteBtn({id}:{id:string}) {
    const router = useRouter()
    const[loading,setLoading] = useState(false)
    const handleDelete=async()=>{
    try {
        setLoading(true)
        await deletePost(id)

        toast.info("deleted successfully")
        router.push(POSTS)
    }
    catch (err:any){
        console.log(err)
        toast.error(err.message || "something went wrong",3000)
    }
        setLoading(false)
    }
  return (
      <Button
          variant={"destructive"}
          onClick={handleDelete}
      >
          {loading ? "Deleting..." :
              <p className={"flex gap-2"}>
                  <Trash2/>
                  <span>Delete</span>
              </p>
          }</Button>
  )
}

export default DeleteBtn