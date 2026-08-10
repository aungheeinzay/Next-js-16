import { ABOUTS, POSTS } from "@/path"
import Link from "next/link"
import { ModeToggle } from "./ThemeToggle"


function Header() {
  return (
    <div className="w-full flex justify-between items-center">
        <h2 className="text-4xl font-bold">Dev Form</h2>
        <div className="flex gap-4">
            <Link href={POSTS}>posts</Link>
            <Link href={ABOUTS}>about</Link>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Header