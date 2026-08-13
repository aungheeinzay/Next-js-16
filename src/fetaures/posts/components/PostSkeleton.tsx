import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function PostSkeleton() {
  return (
   <div className='sm:w-full w-[400px] flex flex-wrap gap-y-4'>
     <Skeleton className='w-full h-40 rounded-md'/>
      <Skeleton className='w-full mx-auto sm:w-lg rounded-md'/>
       <Skeleton className='w-full h-40 rounded-md'/>
        <Skeleton className='w-full h-40 rounded-md'/>
   </div>
  )
}

export default PostSkeleton