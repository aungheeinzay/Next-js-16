"use client"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle } from 'lucide-react'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { useAction } from 'next-safe-action/hooks'
import { toast } from '@/components/toaster/toast'

import {creatingComment} from "@/fetaures/comment/action/createComment";
import {updatingComment} from "@/fetaures/comment/action/updatingComment";
import {Comment} from "../../../../generated/prisma/client";
import {updateCommentSchema} from "@/fetaures/comment/schema/updateComment";
import {createCommentSchema} from "@/fetaures/comment/schema/createComment";

interface CommentFormProps {
    isUpdate: boolean;
    actionFn: typeof creatingComment | typeof updatingComment;
    postId:string
    commentI?:{
        id:string;
        comment:string
    }
}
interface CustomServerError {
    statusCode?: number;
    message: string;

}

function PostForm({ isUpdate, actionFn, commentI,postId }: CommentFormProps) {

    const { executeAsync, isPending } = useAction(actionFn as any,{
        onSuccess:()=>{
            form.reset();
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

    const createUpdateSchema = isUpdate ? updateCommentSchema : createCommentSchema;

    const form = useForm<z.infer<typeof createUpdateSchema>>({
        resolver: zodResolver(createUpdateSchema),
        defaultValues: {
            comment:commentI?.comment || "",
            commentId: commentI?.id,
            postId:postId
        }
    });

    const onSubmit = async (formData: z.infer<typeof createUpdateSchema>) => {

        await executeAsync(formData);

    };

    return (
        <Card className='w-full p-4'>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}
            className={"flex gap-2 items-center justify-center"}>


                      <Controller
                          name="comment"
                          control={form.control}
                          render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                  <Input
                                      {...field}
                                      id="form-rhf-demo-comment"
                                      aria-invalid={fieldState.invalid}
                                      autoComplete="off"
                                      placeholder='Enter comment....'
                                  />
                                  {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                  )}
                              </Field>
                          )}
                      />


                <Button variant={"default"} type='submit' className=''>
                    {isUpdate ? (isPending ? LoaderFn("...") : "updating") : (isPending ? LoaderFn("...") : "comment")}
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