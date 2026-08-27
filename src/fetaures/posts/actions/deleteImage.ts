// app/actions/deleteImage.ts
"use server"
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteImageFromUT(fileUrl: string) {
    try {

        const fileKey = fileUrl.split("/f/")[1] || fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

        if (!fileKey) return

        await utapi.deleteFiles(fileKey);
    } catch (error) {
        console.error("Failed to delete file:", error);
        return { success: false, error: "Failed to delete image" };
    }
}

export async function deleteImages(fileUrl:string[]){
    try {
        const deleteKey =fileUrl.map((url)=>url.split("/f/")[1]).filter(Boolean)
        await utapi.deleteFiles(deleteKey)
    }catch (e){
        console.log("failed to delete file:",e)
    }
}