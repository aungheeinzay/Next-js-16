import { Button } from '@/components/ui/button'
import {Card, CardDescription, CardFooter, CardTitle} from '@/components/ui/card'
import {EDIT_POST, SINGLE_POSTS} from '@/path'
import Link from 'next/link'
import { postWithUser} from '../types/post'
import {Eye, SquarePen} from 'lucide-react'
import DeleteBtn from "@/fetaures/posts/components/deleteBtn";

interface  postItemProps extends  postWithUser{
    isDetail:boolean
    loginUser:string | undefined
}
function PostItem({id,title,body,status,user,isDetail,loginUser}:postItemProps) {
    const currentUser = loginUser ===user.id

  return (
     <Card key={title} className='w-full p-4 flex flex-wrap justify-start'>
                        <CardTitle>
                            <div>
                                <span>author: {user.name}</span>
                            </div>
                          <div className=' font-bold flex justify-between '>
                              <p className='text-lg'>{title}</p>
                              <span
                                  className='text-[10px] p-2  font-mono bg-green-800 rounded-md grid place-items-center'
                              >{status}</span>
                          </div>
                        </CardTitle>
                    <CardDescription className={`text-sm font-mono ${!isDetail && "line-clamp-2"}`}>
                        {body}</CardDescription>
                <div className={"flex gap-2"}>
                    {
                        isDetail? currentUser && <DeleteBtn id={id}/> :
                        <>
                            <Button
                                variant={"outline"}
                                className={"w-fit"}

                            >
                                <Eye/>
                                <Link href={SINGLE_POSTS(id)}>details</Link>
                            </Button>
                            {
                                currentUser &&  <Button asChild><Link href={EDIT_POST(id)}>
                                    <SquarePen/>
                                    edit
                                </Link></Button>
                            }
                        </>
                    }
                </div>
                    </Card>
  )
}

export default PostItem