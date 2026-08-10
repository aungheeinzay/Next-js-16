import { Separator } from "./ui/separator";

interface Props{
    title:string;
    description?:string
}

function Heading({title,description}:Props) {
  return (
    <div className="w-full">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{description}</p>
        <Separator/>
    </div>
  )
}

export default Heading