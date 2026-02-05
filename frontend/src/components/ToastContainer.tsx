/**
 * ToastContainer - Toast Notification Manager
 *
 * A container component that renders multiple toast notifications
 * in a fixed position (top-right corner). Manages the display
 * and removal of toast messages.
 *
 * Props:
 * - toasts: Array of ToastMessage objects to display
 * - onRemoveToast: Callback to remove a toast by ID
 *
 * Also exports ToastMessage interface for typing toast objects.
 * Works with: useToast hook for state management, Toast component for rendering
 */
import Toast, { ToastType } from "./Toast"

export interface ToastMessage {
    id: string
    message: string
    type: ToastType
}

interface ToastContainerProps {
    toasts: ToastMessage[]
    onRemoveToast: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => onRemoveToast(toast.id)}
                />
            ))}
        </div>
    )
}

export default ToastContainer