"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAction} from "next-safe-action/hooks";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import {resetPasswordAction} from "@/fetaures/auth/action/resetPassword";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/toaster/toast";
import {resetPasswordSchema} from "@/fetaures/auth/schema/auth.resetPassword";
import {Field, FieldError} from "@/components/ui/field";

interface Props{
    actionFun:typeof resetPasswordAction
}

export default function ForgetPasswordForm({actionFun}:Props){
    const {executeAsync,isPending} = useAction(actionFun,{
        onSuccess:()=>{
            toast.success("Password reset link sent")
            return
        },
        onError:({error})=>{
            toast.error("something went wrong")
        }
    })
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver:zodResolver(resetPasswordSchema),
        defaultValues:{
            email: ""
        }
    })
    async function onSubmit(data:z.infer<typeof resetPasswordSchema>){
    await executeAsync(data)
    }
    return(

                <form onSubmit={form.handleSubmit(onSubmit)}
                className={"grid gap-4"}>
                    <Controller

                        name={"email"}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field

                                data-invalid={fieldState.invalid}>
                                <Input {...field} placeholder="Enter your email of yours..." />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Button>{isPending ? "sending..." : "Get link"}</Button>
                </form>
    )
}