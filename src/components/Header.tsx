"use server"
import {ABOUTS, POSTS, PROFILE, SIGNINPATH, SIGNUPPATH} from "@/path"
import Link from "next/link"
import { ModeToggle } from "./ThemeToggle"
import { Button } from "./ui/button"
import {signOutAction} from "@/fetaures/auth/action/signOut";
import {cacheSession} from "@/lib/session";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


async function Header() {
    const session = await cacheSession()

  return (
    <div className="w-full flex justify-between items-center">
        <Link href={"/"}>
            <h2 className="text-4xl font-bold">Dev Form</h2>
        </Link>
        <div className="flex gap-4">
            <Link href={POSTS}>posts</Link>
            {
                session ?
                    // <form action={signOutAction}>
                    //     <Button variant={"destructive"}>sign out</Button>
                    // </form>
                    //
                   <Link href={PROFILE}>
                       <Avatar>
                           <AvatarImage src={session?.user?.image ?? undefined}></AvatarImage>
                           <AvatarFallback>
                               {session?.user?.name?.toUpperCase()?.slice(0,2) || "DF"}
                           </AvatarFallback>
                       </Avatar>
                   </Link>:
                    <SignInUp/>
            }
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Header


function SignInUp(){
  return (
    <div className="flex gap-4 items-center">
      <Button asChild>
        <Link href={SIGNUPPATH}>Sign up</Link>
      </Button>
        <Button asChild variant={"outline"}>
        <Link href={SIGNINPATH}>Sign in</Link>
      </Button>
    </div>
  )
}