"use client"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { PostI } from '../types/post'
import { LoaderCircle } from 'lucide-react'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { POSTS } from "@/path";
import { creatingPost } from '../actions/createPost'
import { useAction } from 'next-safe-action/hooks'
import { createPostSchema } from '../schema/createPost'
import { updatingPost } from '../actions/updatePost'
import { toast } from '@/components/toaster/toast'
import { SelectStatus } from './SelectStatus'
import { updatePostSchema } from '../schema/updatePost'
import { useRouter } from 'next/navigation'
import FileUploader from "@/fetaures/posts/components/uploadFile";
import {useState} from "react";

interface PostFormProps {
  isUpdate: boolean;
  actionFn: typeof creatingPost | typeof updatingPost;
  data?: PostI;
}
interface CustomServerError {
    statusCode?: number;
    message: string;
}

function PostForm({ isUpdate, actionFn, data }: PostFormProps) {

    const [imagesLoading,setImagesLoading]=useState(false)
  const router = useRouter()
  const { executeAsync, isPending } = useAction(actionFn as any,{
      onSuccess:()=>{
          form.reset();
          toast.success(isUpdate ? "post updated successfully" : "post created successfully")
          router.push('/')
          return
      },
      onError:({error})=>{
          if (error.serverError) {
              const serverErr = error.serverError as CustomServerError;
              toast.error(serverErr.message)
              return;
          }
      }
  });

  const createUpdateSchema = isUpdate ? updatePostSchema : createPostSchema;
  
  const form = useForm<z.infer<typeof createUpdateSchema>>({
    resolver: zodResolver(createUpdateSchema),
    defaultValues: {
      title: data?.title || "",
      body: data?.body || "",
        images:data?.images ?? [],
      ...(isUpdate && { 
          status: (data as any)?.status || "IN_PROGESS",
         id: data?.id || "" })
    }
  });
  
  const onSubmit = async (formData: z.infer<typeof createUpdateSchema>) => {


      const updateData = {
        id: data?.id,
        ...formData
      };

      console.log("upd data",updateData);
      await executeAsync(isUpdate ? updateData : formData);

  };

  return (
    <Card className='w-full p-4'>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder='Enter title....'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Textarea
                  {...field}
                  id="form-rhf-demo-body"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder='Enter content here...'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

            <Controller
                name={"images"}
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                     <FileUploader value={field.value} onChange={field.onChange} setImageLoading={setImagesLoading}/>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

          {isUpdate && 
          <Controller
          name={"status" as any}
          control={form.control}
          render={({field,fieldState})=>(
          
             <Field data-invalid={fieldState.invalid}>
                <SelectStatus
                value={field.value}          
                onValueChange={field.onChange}
                   aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
          )
          }
          />
          }
        </FieldGroup>

        <Button
            disabled={imagesLoading || form.formState.isSubmitting}
            variant={"default"} type='submit' className='mt-4 w-full'>
          {isUpdate ? (isPending ? LoaderFn("Updating...") : "Update") : (isPending ? LoaderFn("Saving...") : "Save")}
        </Button>
      </form>
    </Card>
  );
}

export default PostForm;

function LoaderFn(name: string) {
  return (
    <div className='flex gap-4 items-center'>
      <LoaderCircle className='animate-spin scale-105' />
      <span>{name}</span>
    </div>
  );
}