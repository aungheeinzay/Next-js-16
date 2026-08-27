'use client'


import TipTapButtons from "@/fetaures/posts/components/TipTapButtons";
import {Placeholder} from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";
import {EditorContent, useEditor} from "@tiptap/react";

interface TipTap {
    value: string
    onChange: (value: string) => void
}

export default function Tiptap({ value, onChange }: TipTap) {
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

        ],
        content: value,
        editorProps: {
            attributes: {
                // Focus ပြုလုပ်ချိန်တွင် Border အပြာရောင်မပေါ်ဘဲ စာရွက်ပေါ်တွင် တိုက်ရိုက်ရိုက်နေသည့် ပုံစံဖြစ်စေရန် focus:outline-none သုံးထားသည်
                class: "prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[200px] [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1"
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