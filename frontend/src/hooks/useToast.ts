/**
 * useToast - Custom Hook for Toast Notification Management
 *
 * Provides state and methods for managing toast notifications.
 * Toasts are stored as an array and each has a unique ID for removal.
 *
 * Returns:
 * - toasts: Array of current toast messages
 * - removeToast(id): Remove a specific toast by ID
 * - showSuccess(message): Display a green success toast
 * - showError(message): Display a red error toast
 * - showInfo(message): Display a blue info toast
 *
 * Usage: const { toasts, showSuccess, showError, removeToast } = useToast()
 * Works with: ToastContainer component for rendering
 */
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