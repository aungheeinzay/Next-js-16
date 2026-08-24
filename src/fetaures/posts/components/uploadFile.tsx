"use client"
import { generateReactHelpers } from "@uploadthing/react"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import React, { useRef, useState } from "react"
import { toast } from "@/components/toaster/toast"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { deleteImageFromUT } from "@/fetaures/posts/actions/deleteImage"

const { useUploadThing } = generateReactHelpers<typeof ourFileRouter>()

interface FileUploadProps {
    value?: string[]
    onChange: (value: string[]) => void
    max?: number
    setImageLoading: (load: boolean) => void
}

export default function FileUploader({ value = [], onChange, setImageLoading, max = 4 }: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = useState(false)

    const { startUpload, isUploading } = useUploadThing("postImages", {
        onClientUploadComplete: (res: { url: string }[]) => {
            setImageLoading(false)
            const urls = res.map((file) => file.url)
            if (urls.length) {
                onChange([...value, ...urls].slice(0, max))
                toast.success("Image uploaded successfully")
            }
            setDragActive(false)
        },
        onUploadError: (error: Error) => {
            setImageLoading(false)
            toast.error(error.message)
            setDragActive(false)
        }
    })

    const handleFiles = async (fileList: FileList | null) => {
        if (!fileList?.length) return
        const allowed = Math.max(0, max - value.length)
        if (allowed <= 0) {
            toast.info("Over maximum image limit")
            return
        }
        const files = Array.from(fileList).slice(0, allowed)
        setImageLoading(true)
        await startUpload(files)
    }

    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragActive(false)
        await handleFiles(e.dataTransfer.files)
    }

    const handleRemove = async (urlToRemove: string) => {
        onChange(value.filter((url) => url !== urlToRemove))
        await deleteImageFromUT(urlToRemove)
    }

    const remaining = max - value.length
    const showLimit = remaining <= 0

    return (
        <div className="space-y-4">
            {/* Dropzone Container */}
            <div
                aria-disabled={isUploading || showLimit}
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragActive(true)
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
                className={cn(
                    "relative flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-gradient-to-br from-secondary/50 to-accent/40 p-6 text-center transition-all",
                    dragActive ? "border-primary shadow-lg shadow-primary/20" : "border-border",
                    isUploading && "opacity-50 pointer-events-none"
                )}
            >
                {value.length > 0 ? (
                    <div className="grid grid-cols-4 gap-3 w-full">
                        {value.map((url, index) => (
                            <div key={`${url}-${index}`} className="relative group aspect-square rounded-md overflow-hidden border">
                                <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemove(url)
                                    }}
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className="font-medium text-sm">Attach Images</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Drag & drop or click to upload. Up to {max} images, 4MB each.
                        </p>
                    </div>
                )}

                <Button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    variant="outline"
                    disabled={isUploading || showLimit}
                >
                    {isUploading ? "Uploading..." : "Browse"}
                </Button>

                <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) =>{
                        setImageLoading(true)
                        handleFiles(e.target.files)
                    }}
                />
            </div>
        </div>
    )
}