import { createContext, useCallback, useState } from 'react'

export const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((type, message) => {
    const id = Date.now() + Math.random()

    setToasts((currentToasts) => [...currentToasts, { id, type, message }])

    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback((message) => addToast('success', message), [addToast])
  const error = useCallback((message) => addToast('error', message), [addToast])
  const info = useCallback((message) => addToast('info', message), [addToast])

  return (
    <ToastContext.Provider value={{ toasts, removeToast, success, error, info }}>
      {children}
    </ToastContext.Provider>
  )
}