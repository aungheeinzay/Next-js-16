"use server"

import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {cache} from "react";

export const cacheSession =cache(async ()=>{
    const session = await auth.api.getSession({
        headers:await headers()
    })
    if (!session)return null
    return session
})