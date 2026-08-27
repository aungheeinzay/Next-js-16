"use client"
import { Button } from '@/components/ui/button'
import {Card, CardDescription, CardFooter, CardTitle} from '@/components/ui/card'
import {EDIT_POST} from '@/path'
import Link from 'next/link'
import { postWithUser} from '../types/post'
import {Eye, SquarePen} from 'lucide-react'
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
function PostItem({id,title,body,status,user,loginUser,images}:postItemProps) {
    const [comments,setComments]=useState<CommentWithUser[]>([])

    const [loading,setLoading] = useState(false)
    const [expend,setExpend] = useState(false)
    const [selectedImg, setSelectedImg] = useState<string | null>(null); // Click လုပ်ထားသော ပုံကို သိမ်းရန် State
    const currentUser = loginUser ===user.id
    const caculateColumn=(count:number)=>{
     if (count===1){
         return "grid-cols-1"
     }else {
         return "grid-cols-2"
     }
    }
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
                    <CardDescription className={`text-sm font-mono ${!expend && "line-clamp-2"} [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1`}
                    dangerouslySetInnerHTML={{__html:body}}>
                       </CardDescription>
         {
             images.length>0 && <div className={`grid ${caculateColumn(images.length)} border p-2 rounded-md`}>
                 {
                     images.map((img,i)=>(
                         <div
                             onClick={() => setSelectedImg(img)}
                             key={i} className={`relative h-[200px] w-full overflow-hidden rounded-md border bg-muted ${(images.length==3 && i==0 ) && "col-span-2" }`}>
                             <img
                                 src={img}
                                 alt={`post-image-${i}`}
                                 className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                             />
                         </div>
                     ))
                 }
             </div>
         }

         {/* Full Screen Lightbox Modal */}
         {selectedImg && (
             <div
                 className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                 onClick={() => setSelectedImg(null)}
             >
                 {/* Close Button */}
                 <button
                     type="button"
                     className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors z-10"
                     onClick={() => setSelectedImg(null)}
                 >
                  close
                 </button>

                 {/* Full Size Image */}
                 <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
                     <img
                         src={selectedImg}
                         alt="Expanded view"
                         className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                         onClick={(e) => e.stopPropagation()}
                     />
                 </div>
             </div>
         )}
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