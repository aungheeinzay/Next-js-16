import { stat } from "fs"
import { useEffect, useState } from "react"

type enumVarant = "success" | "error" | "info"
interface toastI{
    id:string
    text:string
    variant:enumVarant
}

interface State{
    toasts:toastI[]
}

type Action=
{type:"ADD",toast:toastI} |
{type:"REMOVE",id:string}
// subject session

let initialState:State={
    toasts:[]
}

let listener:Array<(state:State)=>void>=[]

function dispatch(action:Action){
switch(action.type){
    case "ADD" :
        initialState={
            ...initialState,
            toasts:[action.toast,...initialState.toasts].slice(0,5)
        }
        break
    case "REMOVE" :
        initialState={
            ...initialState,
            toasts:initialState.toasts.filter((toast)=>toast.id !==action.id)
        }
        break
     
}
       calling()
}
//call observer
function calling()
{
    listener.map((lis)=>lis(initialState))
}

//register observer hook

export function useToast(){
    const [state,setState] = useState(initialState)
    useEffect(()=>{
        listener.push(setState)
        return ()=>{
            const index = listener.indexOf(setState)
            if(index>-1)listener.slice(index,1)
        }
    },[])
    return state
}

//notify observer

function toasting(variant:enumVarant){
    return (text:string,delay=3000)=>{
        const id = Math.floor(Math.random()*10)+""
        dispatch({
            type:"ADD",
            toast:{
                id,
                text,
                variant
            }
        })

        setTimeout(()=>{
            dispatch({
                type:"REMOVE",
                id
            })
        },delay)
    }
}


export const toast={
success:toasting("success"),
error:toasting("error"),
info:toasting("info")
}