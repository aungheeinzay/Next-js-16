"use client"

import { Button } from '@/components/ui/button'
import { deletePost } from '../actions/deletePost'
import { useState } from 'react'
import { POSTS } from '@/path'



function DeleteBtn({id}:{id:string}) {
    const[loading,setLoading] = useState(false)
    const handleDelete=async()=>{
        setLoading(true)
        await deletePost(id)
        setLoading(false)
       
    }
  return (
    <Button
    variant={"destructive"}
    onClick={handleDelete}
    >{loading ? "Deleting..." : "Delete"}</Button>
  )
}

export default DeleteBtn