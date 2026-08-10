"use client"
interface ErrorProps{
    error:Error
}

export default function Error({error}:ErrorProps){
    return <p className="text-center text-2xl text-red-500">{error.message || "404 | something went wrong"}</p>
}