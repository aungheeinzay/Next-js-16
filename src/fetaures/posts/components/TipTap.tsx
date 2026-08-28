'use client'


import TipTapButtons from "@/fetaures/posts/components/TipTapButtons";
import {Placeholder} from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";
import {EditorContent, useEditor} from "@tiptap/react";
import Mention from "@tiptap/extension-mention";
import {tagSuggestion} from "@/fetaures/posts/actions/tipTapSuggestion";
import {useRouter} from "next/navigation";

interface TipTap {
    value: string
    onChange: (value: string) => void
}

export default function Tiptap({ value, onChange }: TipTap) {
    const  router = useRouter()
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3]
                }
            }),
            Placeholder.configure({
                placeholder: "write your ideas"
            }),
            Mention.configure({
                HTMLAttributes:{
                    class: "hash text-blue-500 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.5 rounded cursor-pointer hover:underline m-2",
                },
                suggestion:{...tagSuggestion}
            })

        ],
        content: value,
        editorProps: {
            attributes: {

                class: "prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[200px] [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1"
            },
            handleClick: (view, pos, event) => {
                const target = event.target as HTMLElement;

                // HTML Class သို့မဟုတ် span Tag အား closest() ဖြင့် ရှာဖွေခြင်း
                const mentionElement = target.closest('.text-blue-500') || target.closest('span');

                if (mentionElement) {

                    const tagText = mentionElement.textContent?.replace('#', '').trim();

                    if (tagText) {
                        window.alert("hello world")
                        return true;
                    }
                }
                return false;
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        immediatelyRender: false,
    })

    return (
        <div className="space-y-2">
            <TipTapButtons editor={editor} />
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none p-4 border rounded-lg">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}