
import {Card, CardHeader} from "@/components/ui/card";


interface ProfileBio{
    image:string | undefined | null
    bio?:string
    name:string
}
export default function ProfileBio({image,bio,name}:ProfileBio){

    const imageVector = "https://img.magnific.com/premium-vector/programming-concept-with-cartoon-people-flat-design-web-man-coding-engineering-software-creating-scripts-algorithms-vector-illustration-social-media-banner-marketing-material_9209-15330.jpg?semt=ais_hybrid&w=740&q=80"
    return (
        <Card className={"w-full  p-4 rounded-md"}>
            <CardHeader className={"flex justify-start gap-10 items-center"}>
                <div className={"max-w-30 max-h-30 overflow-hidden rounded-full"}>
                    <img
                        className={"object-contain"}
                        src={image ?? imageVector} alt={"image"}/>
                </div>
                <div className={"text-xl font-bold "}>
                    <p>{name}</p>
                    {
                        bio &&
                            <p>{bio}</p>
                    }

                </div>
            </CardHeader>
        </Card>
    )
}