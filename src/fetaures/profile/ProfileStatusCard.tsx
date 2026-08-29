import {FileCog} from "lucide-react";

interface StatusCardProps{
    totalPost:number;
    about:number;
    skills:number
}
export default function StatusCard({totalPost,about,skills}:StatusCardProps){
    const status=[
        {
            label:"posts",
            icon:<FileCog/>,
            count:totalPost
        }
    ]
    return (
        <div>

        </div>
    )
}