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