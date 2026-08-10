import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function PostSkeleton() {
  return (
   <div className='flex flex-wrap gap-y-4'>
     <Skeleton className='w-4xl h-40 rounded-md'/>
      <Skeleton className='w-4xl h-40 rounded-md'/>
       <Skeleton className='w-4xl h-40 rounded-md'/>
   </div>
  )
}

export default PostSkeleton