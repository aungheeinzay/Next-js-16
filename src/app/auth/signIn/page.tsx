import Heading from '@/components/Heading'
import { signInAction } from '@/fetaures/auth/action/signIn'
import AuthForm from '@/fetaures/auth/components/authForm'
import React from 'react'

function page() {
  return (
    <div>
        <Heading 
        title='Sign In'
        description="create account for best user experiences"/>
        <AuthForm isSignUp={false} actionFn={signInAction}/>
    </div>
  )
}

export default page