import { useState, useCallback } from 'react'
import type { ToastMessage } from "../components/ToastContainer"
import type { ToastType } from '../components/Toast'

export const useToast = () => {
    const [toast, setToast] = useState<ToastMessage[]>([])

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now().toString()
        setToast((prevToasts) => [...prevToasts, { id, message, type }])
    }, [])

    const removeToast = useCallback((id: string) => {
        setToast((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, [])

    const showSuccess = useCallback((message: string) => {
        addToast(message, 'success')
    }, [addToast])

    const showError = useCallback((message: string) => {
        addToast(message, 'error')
    }, [addToast])

    const showInfo = useCallback((message: string) => {
        addToast(message, 'info')
    }, [addToast])
    
    return {
        toasts: toast,
        removeToast,
        showSuccess,
        showError,
        showInfo,
    }
}