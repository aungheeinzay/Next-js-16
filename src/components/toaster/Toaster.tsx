"use client"
import { CircleCheck, CircleX, Info } from "lucide-react"
import { useToast } from "./toast"
import React from "react"

type enumPosition = "topRight" | "topCenter" | "topLeft" | "bottomCenter" | "bottomLeft" | "bottomRight"

interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: enumPosition
}

export function Toaster({ className, position = "bottomRight" }: ToasterProps) {
  const { toasts } = useToast()

  const variantsClass = {
    success: "border bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100",
    error: "border bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
    info: "border-slate-200 bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100"
  }

  const variantsIcon = {
    success: <CircleCheck className="w-5 h-5 text-green-600 shrink-0" />,
    error: <CircleX className="w-5 h-5 text-red-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
  }

  const positionClasses: Record<enumPosition, string> = {
    topRight: "top-0 right-0 items-end flex-col",
    topCenter: "top-0 left-1/2 -translate-x-1/2 items-center flex-col",
    topLeft: "top-0 left-0 items-start flex-col",
    bottomRight: "bottom-0 right-0 items-end flex-col-reverse",
    bottomCenter: "bottom-0 left-1/2 -translate-x-1/2 items-center flex-col-reverse",
    bottomLeft: "bottom-0 left-0 items-start flex-col-reverse"
  }

  if (toasts.length === 0) return null

  return (
    <div className={`fixed z-50 flex max-h-screen w-full p-4 md:max-w-[420px] ${positionClasses[position]} `}>
      {toasts.map((toast) => {
        const variant = toast.variant && variantsClass[toast.variant] ? toast.variant : "info"
        
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all mb-2 animate-slide-in ${variantsClass[variant]} ${className || ""}`}
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              {variantsIcon[variant]}
              <p>{toast.text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Toaster