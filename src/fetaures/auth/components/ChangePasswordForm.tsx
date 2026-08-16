"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAction} from "next-safe-action/hooks";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/toaster/toast";
import {Field, FieldError} from "@/components/ui/field";
import {changePasswordAction} from "@/fetaures/auth/action/changePassword";
import {changePasswordSchema} from "@/fetaures/auth/schema/auth.changePassword";
import {useRouter, useSearchParams} from "next/navigation";
import {SIGNINPATH} from "@/path";

interface Props{
    actionFun:typeof changePasswordAction
}

export default function ChangePasswordForm({actionFun}:Props){
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const router = useRouter()
    const {executeAsync,isPending} = useAction(actionFun,{
        onSuccess:()=>{
            toast.success("password changed successfully")
            router.push(SIGNINPATH)
            return
        },
        onError:({error})=>{
            if (error.serverError){

                return  toast.error((error.serverError as any).message)
            }
            toast.error("something went wrong")
        }
    })
    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver:zodResolver(changePasswordSchema),
        defaultValues:{
            newPassword: "",
            confirmPassword: "",
            token
        }
    })
    async function onSubmit(data:z.infer<typeof changePasswordSchema>){
        console.log("data",data)
        await executeAsync(data)
    }
    return(

        <form onSubmit={form.handleSubmit(onSubmit)}
              className={"grid gap-4"}>
            <Controller

                name={"newPassword"}
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field

                        data-invalid={fieldState.invalid}>
                        <Input {...field} placeholder="new password..." />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller

                name={"confirmPassword"}
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field

                        data-invalid={fieldState.invalid}>
                        <Input {...field} placeholder="confirm password..." />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Button>{isPending ? "saving..  ." : "save"}</Button>
        </form>
    )
}