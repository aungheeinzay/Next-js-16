// app/actions/deleteImage.ts
"use server"
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteImageFromUT(fileUrl: string) {
    try {
        // URL ထဲမှ fileKey ကို ထုတ်ယူခြင်း (e.g., https://utfs.io/f/FILE_KEY -> FILE_KEY)
        const fileKey = fileUrl.split("/f/")[1] || fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

        if (!fileKey) return

        // UploadThing server မှ ဖျက်ခြင်း
        await utapi.deleteFiles(fileKey);
        return { success: true };
    } catch (error) {
        console.error("Failed to delete file:", error);
        return { success: false, error: "Failed to delete image" };
    }
}