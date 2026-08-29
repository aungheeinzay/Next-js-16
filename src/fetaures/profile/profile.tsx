import {cacheSession} from "@/lib/session";
import {redirect} from "next/navigation";
import ProfileBio from "@/fetaures/profile/Avator";
import Heading from "@/components/Heading";

export default async function Profile(){
    const session = await cacheSession()
if (!session)return redirect("/")
    const user =session.user
    return (
        <div>
            <Heading title={"Profile"} description={""}/>
            <ProfileBio image={user.image}  name={user.name}/>
        </div>
    )
}