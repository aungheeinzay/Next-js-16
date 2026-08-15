import React from 'react'
import Heading from "@/components/Heading";
import AuthForm from "@/fetaures/auth/components/authForm";
import {signUpAction} from "@/fetaures/auth/action/signUp";

function Page() {
  return (
   <div>
    <Heading title={"Sign Up"} description={"create account for best user experience"}/>
       <AuthForm isSignUp={true} actionFn={signUpAction}/>
   </div>
  )
}

export default Page