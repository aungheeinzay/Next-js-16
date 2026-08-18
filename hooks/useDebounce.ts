import {useEffect, useState} from "react";

export function useDebounce(debounceValue:string,delay:number){
    const [state,setState]=useState(debounceValue)
    useEffect(()=>{
    const  timer = setTimeout(()=>{
        setState(debounceValue)
    },delay)
        return ()=>clearTimeout(timer)
    },[debounceValue])
    return state
}