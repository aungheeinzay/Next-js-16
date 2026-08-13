"use client"

import { Button } from '@/components/ui/button'
import { deletePost } from '../actions/deletePost'
import { useState } from 'react'
import { POSTS } from '@/path'
import { toast } from '@/components/toaster/toast'
import { useRouter } from 'next/navigation'



function DeleteBtn({id}:{id:string}) {
    const router = useRouter()
    const[loading,setLoading] = useState(false)
    const handleDelete=async()=>{
        setLoading(true)
        await deletePost(id)
        setLoading(false)
        toast.info("deleted successfully")
        router.push(POSTS)
    }
  return (
    <Button
    variant={"destructive"}
    onClick={handleDelete}
    >{loading ? "Deleting..." : "Delete"}</Button>
  )
}

export default DeleteBtn