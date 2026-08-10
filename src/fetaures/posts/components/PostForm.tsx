"use client"
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { PostI } from '../types/post'
import { useActionState, useTransition } from 'react'
import { Loader, LoaderCircle } from 'lucide-react'

interface PostFormProps{
  isUpdate:boolean;
  actionFn:(actionState:{message:string},formData:FormData)=>Promise<{message:string}>;
  data?:PostI
}

 function PostForm({isUpdate,actionFn,data}:PostFormProps) {
  const [actionState,formAction,isPending] = useActionState(actionFn,{
    message:""
  })
 // const [isPending,startTransition] = useTransition()
// const handleSubmit=(formdata:FormData)=>{
// startTransition(async()=>await actionFn(formdata))

// }

  return (
    <Card className='w-full p-4'>
        <form action={formAction} className="w-full flex flex-wrap gap-4">
        <Input name='title' placeholder='enter title here' defaultValue={data?.title}/>
        <Textarea name='body' placeholder='enter the content here!' defaultValue={data?.body}/>
        <Button variant={"default"} type='submit'>{isUpdate ? isPending ? LoaderFn("updating...") : "update" :
         isPending ? LoaderFn("saving...")  :"save"}</Button>
        </form>
       <CardFooter>{actionState?.message}</CardFooter>
    </Card>
  )
}

export default PostForm

function LoaderFn(name:string){
 
    return (
    <div className='flex gap-4 items-center'>
  <LoaderCircle className='animate-spin scale-105'/>
   <span>{name}</span>
</div>
  )
  
}