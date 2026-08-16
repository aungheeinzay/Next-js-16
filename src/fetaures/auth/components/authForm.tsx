"use client"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { LoaderCircle } from 'lucide-react'
import {Card, CardFooter} from '@/components/ui/card';
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { useAction } from 'next-safe-action/hooks'
import { toast } from '@/components/toaster/toast'
import { useRouter } from 'next/navigation'
import { signInAction } from '../action/signIn'
import { signUpAction } from '../action/signUp'
import { signInSchema, signUpSchema } from '../schema';
import {FORGETPASSWORD, POSTS, SIGNINPATH, SIGNUPPATH} from '@/path';
import Link from "next/link";

interface AuthFormProps {
  isSignUp: boolean;
  actionFn: typeof signInAction | typeof signUpAction;
}
interface CustomServerError {
  statusCode?: number;
  message: string;
}

function AuthForm({ isSignUp, actionFn }: AuthFormProps) {
  const router = useRouter()
  const formSchema = isSignUp ? signUpSchema : signInSchema
  const { executeAsync, isPending } = useAction(actionFn as any,{
    onSuccess:()=>{
      form.reset();
      
      toast.success(isSignUp ? "Account created successfully" : "Signed in successfully", 3000);

    },
    onError:({error})=>{
      if (error.serverError) {
        const serverErr = error.serverError as CustomServerError;
        if (serverErr.statusCode ===422){
          toast.error(serverErr.message.split(".")[0]);
          return
        }
        toast.error(serverErr.message)
        return;
      }

    }
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isSignUp && {
        name:"",
        confirmPassword:""
      })
    }
  })

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.log("form data",formData);
    
 
      await executeAsync(formData as any);
  };

  return (
    <Card className='w-full p-4'>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
        {
            isSignUp &&   <Controller
            name={"name" as any}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-demo-name"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder='Enter name....'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        }
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder='Enter email....'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                id="form-rhf-demo-password"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder='Enter password...'
              />
            )}
          />

          {isSignUp && 
            <Controller
              name={"confirmPassword" as any}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input {...field} placeholder="Confirm password..." />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          }
        </FieldGroup>

        <Button variant={"default"} type='submit' className='mt-4'>
          {isSignUp ? (isPending ? LoaderFn("loading...") : "Sign Up") : (isPending ? LoaderFn("loading...") : "Sign In")}
        </Button>
      </form>
    <CardFooter className={"w-full bg-card/80"}>
      {
        isSignUp ?
            <div className={"flex gap-2"}>
              Already have an account ? :
              <Link href={SIGNINPATH}>Sign in</Link>
            </div> :
            <div className={"flex justify-between w-full"}>
              <div className={"flex gap-2 "}>
                Don't have an account? :
                <Link href={SIGNUPPATH}>Sign up</Link>
              </div>
              <Link href={FORGETPASSWORD} className={"block underline"}>forget password?</Link>
            </div>
      }
    </CardFooter>
    </Card>
  );
}

export default AuthForm;

function LoaderFn(name: string) {
  return (
    <div className='flex gap-4 items-center'>
      <LoaderCircle className='animate-spin scale-105' />
      <span>{name}</span>
    </div>
  );
}