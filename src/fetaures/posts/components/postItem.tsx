"use client"
import { Button } from '@/components/ui/button'
import {Card, CardDescription, CardFooter, CardTitle} from '@/components/ui/card'
import {EDIT_POST} from '@/path'
import Link from 'next/link'
import { postWithUser} from '../types/post'
import {ChevronsDown, Eye, SquarePen} from 'lucide-react'
import DeleteBtn from "@/fetaures/posts/components/deleteBtn";
import {Separator} from "@/components/ui/separator";
import CreateComment from "@/fetaures/comment/components/createComment";
import {useState} from "react";
import CommentBtn from "@/fetaures/comment/components/commentBtn";
import {CommentWithUser} from "@/fetaures/comment/types/commentsT";

interface  postItemProps extends  postWithUser{
    //isDetail:boolean
    loginUser:string | undefined
}
function PostItem({id,title,body,status,user,loginUser}:postItemProps) {
    const [comments,setComments]=useState<CommentWithUser[]>([])
    const [loading,setLoading] = useState(false)
    const [expend,setExpend] = useState(false)
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
                    <CardDescription className={`text-sm font-mono ${!expend && "line-clamp-2"}`}>
                        {body}</CardDescription>
                <div className={"w-full flex gap-2"}>



                            <div className={"flex gap-2 items-center"}>
                                 <Button
                                    variant={"outline"}
                                    className={"w-fit"}
                                    onClick={()=>setExpend(!expend)}

                                >
                                    <Eye/>
                                    <span >{expend ? "see less" : "details"}</span>
                                </Button>

                                {currentUser &&  <>
                                      <Button asChild><Link href={EDIT_POST(id)}>
                                          <SquarePen/>
                                          edit
                                      </Link></Button>
                                      <DeleteBtn id={id}/>
                                  </>

                                }
                            </div>

                </div>
         <Separator/>
         <CommentBtn
             id={id}
             setLoading={setLoading}
             setComments={setComments}
             isLoading={loading}
             comments={comments}
             currentUser={currentUser}
             loginUser={loginUser}
         />
         <CreateComment
             postId={id}
             setComments={setComments}
         />
                    </Card>
  )
}

export default PostItem