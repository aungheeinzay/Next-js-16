// features/posts/components/TagList.tsx
'use client'

import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export const TagList = forwardRef((props: any, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const selectItem = (index: number) => {
        const item = props.items[index]
        if (item) {
            props.command({ id: item.slug, label: item.name })
        }
    }

    useEffect(() => setSelectedIndex(0), [props.items])

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (event.key === 'ArrowUp') {
                setSelectedIndex((prev) => (prev + props.items.length - 1) % props.items.length)
                return true
            }
            if (event.key === 'ArrowDown') {
                setSelectedIndex((prev) => (prev + 1) % props.items.length)
                return true
            }
            if (event.key === 'Enter') {
                selectItem(selectedIndex)
                return true
            }
            return false
        },
    }))

    return (
        <div className="bg-white    dark:border-white rounded-lg shadow-lg overflow-hidden p-1 min-w-[180px] z-50">

            {props.loading ? (
                <div className="p-3 text-gray-700 text-xs text-center flex items-center justify-center gap-2">
                    <span className="animate-spin h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full" />
                    Searching tags...
                </div>
            ) : props.items.length ? (
                props.items.map((item: any, index: number) => (
                    <button
                        key={item.id}
                        type="button"
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md flex items-center justify-between ${
                            index === selectedIndex ? 'bg-gray-100 dark:text-white dark:bg-gray-600 dark:text-blue-400 font-medium' : "dark:text-black"
                        }`}
                        onClick={() => selectItem(index)}
                    >
                        <span>#{item.name}</span>
                        <span className="text-xs text-slate-400 font-normal">{item.usageCount !==0 && item.usageCount}</span>
                    </button>
                ))
            ) : (
                <div className="p-2 text-xs text-slate-400 text-center">No tags found</div>
            )}
        </div>
    )
})

TagList.displayName = 'TagList'