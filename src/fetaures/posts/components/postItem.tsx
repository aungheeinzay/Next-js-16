import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { SINGLE_POSTS } from '@/path'
import Link from 'next/link'
import { PostI } from '../types/post'
import { MoveUpRight } from 'lucide-react'
import { Posts } from '../../../../generated/prisma/client'

function PostItem({id,title,body,status}:Posts) {
  return (
     <Card key={title} className='p-4 flex flex-wrap justify-start'>
                        <CardTitle className=' font-bold flex justify-between '>
                          <p className='text-lg'>{title}</p>
                          <span 
                          className='text-[10px] p-2  font-mono bg-green-800 rounded-md grid place-items-center'
                          >{status}</span>
                        </CardTitle>
                    <CardDescription className='text-sm font-mono line-clamp-2'>{body}</CardDescription>
                    <Button 
                    variant={"outline"}
                    className={"w-fit"}
                    
                    >
                        <MoveUpRight/>
                        <Link href={SINGLE_POSTS(id)}>New Branch</Link>
                    </Button>
                    </Card>
  )
}

export default PostItem