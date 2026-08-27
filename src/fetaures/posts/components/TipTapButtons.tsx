"use client"
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered, // အသစ်ပါဝင်လာသည်
    Quote,       // အသစ်ပါဝင်လာသည်
    Heading1,
    Code
} from "lucide-react";
import {useEffect, useState} from "react";


export default function TipTapButtons({ editor }: { editor: Editor | null }) {
    const [, forceRender] = useState({});

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => forceRender({});

        editor.on("transaction", handleUpdate);
        editor.on("selectionUpdate", handleUpdate);

        return () => {
            editor.off("transaction", handleUpdate);
            editor.off("selectionUpdate", handleUpdate);
        };
    }, [editor]);

    if (!editor) return null;



    return (
        <div className="p-1 flex items-center gap-1 w-full bg-muted/50 rounded-md">
            {/* Heading 1 */}
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
                size="sm"
                type="button"
            >
                <Heading1 className="w-4 h-4" />
            </Button>

            {/* Bold */}
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={editor.isActive('bold') ? 'default' : 'ghost'}
                size="sm"
                type="button"
            >
                <Bold className="w-4 h-4" />
            </Button>

            {/* Italic */}
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                variant={editor.isActive('italic') ? 'default' : 'ghost'}
                size="sm"
                type="button"
            >
                <Italic className="w-4 h-4" />
            </Button>

            {/* Strikethrough */}
            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                variant={editor.isActive('strike') ? 'default' : 'ghost'}
                size="sm"
                type="button"
            >
                <Strikethrough className="w-4 h-4" />
            </Button>

            {/* Bullet List */}
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
                size="sm"
                type="button"
            >
                <List className="w-4 h-4" />
            </Button>

            {/* NEW 1: Ordered List (၁၊ ၂၊ ၃... အမှတ်စဉ်) */}
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
                size="sm"
                type="button"
            >
                <ListOrdered className="w-4 h-4" />
            </Button>

            {/*toggle code btn*/}

            <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
                size="sm"
                type="button"
            >
                <Code className="w-4 h-4" />
            </Button>
            {/*  Blockquote*/}
            <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
                size="sm"
                type="button"
            >
                <Quote className="w-4 h-4" />
            </Button>


        </div>
    );
}