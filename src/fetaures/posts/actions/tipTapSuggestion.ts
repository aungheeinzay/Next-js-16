// features/posts/components/suggestion.ts
import { ReactRenderer } from '@tiptap/react'
import { TagList } from '../components/TagList'


export const tagSuggestion = {
    char:"#",
    minQueryLength: 1,
    debounce: 200, // စာရိုက်ရပ်ပြီး 300ms ကြာမှ API ခေါ်မည်
    initialItems:[
        { id: '1', name: 'react', slug: 'react', usageCount: 0 },
        { id: '2', name: 'java', slug: 'java', usageCount: 0 },
        { id: '3', name: 'javaScript', slug: 'javascript', usageCount: 0 },
        { id: '4', name: 'nodejs', slug: 'nodejs', usageCount: 0 },
    ],
    // 1. AbortSignal ပါဝင်သော Async Data Fetching
    items: async ({ query, signal }: { query: string; signal: AbortSignal }) => {
        try {
            const response = await fetch(`/api/tag?query=${encodeURIComponent(query)}`, { signal })
            if (!response.ok) return []
            const data = await response.json()
            return data
        } catch (error: any) {
            if (error.name === 'AbortError') return []
            console.error("Failed to fetch tags:", error)
            return []
        }
    },

    // 2. Modern Render Callback (props.mount အသုံးပြုပုံ)
    render: () => {
        let component: ReactRenderer<any>
        let unmount: (() => void) | null = null

        return {
            onStart(props: any) {
                component = new ReactRenderer(TagList, {
                    props,
                    editor: props.editor,
                })

                // TipTap မှ Managed Positioning အား တာဝန်ယူ စီမံခိုင်းခြင်း
                if (component.element) {
                    unmount = props.mount(component.element)
                }
            },

            onUpdate(props: any) {
                // props.loading (true/false) နှင့် props.items များကို Component ထံ Update ပို့ခြင်း
                component.updateProps(props)
            },

            onKeyDown(props: any) {
                if (props.event.key === 'Escape') {
                    component.destroy()
                    return true
                }
                return component.ref?.onKeyDown(props)
            },

            onExit() {
                // Memory leak မဖြစ်စေရန် unmount နှင့် destroy ကို မဖြစ်မနေ ခေါ်ပေးရမည်
                unmount?.()
                component?.destroy()
            },
        }
    },
}