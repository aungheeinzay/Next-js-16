// 📁 hooks/use-toast.ts
"use client"
import * as React from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

type Action =
  | { type: "ADD_TOAST"; toast: ToastProps }
  | { type: "DISMISS_TOAST"; toastId?: string }

interface State {
  toasts: ToastProps[]
}


let memoryState: State = { toasts: [] }
const listeners: Array<(state: State) => void> = []

function dispatch(action: Action) {
  switch (action.type) {
    case "ADD_TOAST":
      memoryState = {
        ...memoryState,
        toasts: [action.toast, ...memoryState.toasts].slice(0, 5), // Maximum 5 toasts
      }
      break
    case "DISMISS_TOAST":
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
      }
      break
  }
  listeners.forEach((listener) => listener(memoryState))
}

// 🟢 မည်သည့်နေရာမှမဆို တိုက်ရိုက် ခေါ်သုံးနိုင်သော toast() function
export function toast({ title, description, variant = "default" }: Omit<ToastProps, "id">) {
  const id = Math.random().toString(36).substring(2, 9)

  dispatch({
    type: "ADD_TOAST",
    toast: { id, title, description, variant },
  })

  // ၃ စက္ကန့်ကြာလျှင် အလိုအလျောက် ဖျက်မည်
  setTimeout(() => {
    dispatch({ type: "DISMISS_TOAST", toastId: id })
  }, 3000)
}

// 🟢 Toaster component က Toast list ကို ရယူရန် သုံးမည့် hook
export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [state])

  return {
    toasts: state.toasts,
    dismiss: (id: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }),
  }
}