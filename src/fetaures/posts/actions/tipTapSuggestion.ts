// features/posts/components/suggestion.ts
import { ReactRenderer } from '@tiptap/react'
import { TagList } from '../components/TagList'

export const tagSuggestion = {
    char: "#",
    minQueryLength: 1,
    debounce: 200,
    initialItems: [
        { id: '1', name: 'react', slug: 'react', usageCount: 0 },
        { id: '2', name: 'java', slug: 'java', usageCount: 0 },
        { id: '3', name: 'javaScript', slug: 'javascript', usageCount: 0 },
        { id: '4', name: 'nodejs', slug: 'nodejs', usageCount: 0 },
    ],
    items: async ({ query, signal }: { query: string; signal: AbortSignal }) => {
        if (!query.trim()) return [];

        try {
            const response = await fetch(`/api/tag?query=${encodeURIComponent(query)}`, { signal });
            let data: any[] = [];

            if (response.ok) {
                data = await response.json();
            }


            const hasExactMatch = data.some(
                (tag: any) => tag.name.toLowerCase() === query.toLowerCase()
            );


            if (!hasExactMatch) {
                return [
                    { id: query, name: query, slug: query, usageCount: 0, isNew: true },
                    ...data
                ];
            }

            return data;
        } catch (error: any) {
            if (error.name === 'AbortError') return [];
            console.error("Failed to fetch tags:", error);

            // API Error တက်ပါကလည်း ရိုက်ထားသော query ကို မပျောက်ဘဲ Tag အဖြစ် ရွေးနိုင်စေရန် ပြန်ပေးမည်
            return [{ id: query, name: query, slug: query, usageCount: 0, isNew: true }];
        }
    },

    render: () => {
        let component: ReactRenderer<any>
        let unmount: (() => void) | null = null

        return {
            onStart(props: any) {
                component = new ReactRenderer(TagList, {
                    props,
                    editor: props.editor,
                })

                if (component.element) {
                    unmount = props.mount(component.element)
                }
            },

            onUpdate(props: any) {
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
                unmount?.()
                component?.destroy()
            },
        }
    },
}