import { useEffect } from "react"
import { FiAlertCircle, FiCheckCircle, FiX, FiXCircle } from "react-icons/fi"

export const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
} as const

export type ToastType = typeof ToastType[keyof typeof ToastType]

interface ToastProps {
    message: string
    type: ToastType
    onClose: () => void
    duration?: number
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)
        
        return () => clearTimeout(timer)
    }, [duration, onClose])

    const getToastConfig = () => {
        switch (type) {
            case ToastType.SUCCESS:
                return {
                    icon: < FiCheckCircle size={20} />,
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-500',
                    textColor: 'text-green-800',
                    iconColor: 'text-green-500',
                }
            case ToastType.ERROR:
                return {
                    icon: < FiXCircle size={20} />,
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-500',
                    textColor: 'text-red-800',
                    iconColor: 'text-red-500',
                }
            case ToastType.INFO:
                return {
                    icon: < FiAlertCircle size={20} />,
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-500',
                    textColor: 'text-blue-800',
                    iconColor: 'text-blue-500',
                }
            default:
                return {
                    icon: < FiAlertCircle size={20} />,
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-500',
                    textColor: 'text-gray-800',
                    iconColor: 'text-gray-500',
                }
        }
    }

    const config = getToastConfig()

    return (
        <div className={`${config.bgColor} ${config.borderColor} ${config.textColor} border-l-4 p-4 rounded-lg shadow-lg flex items-start gap-3 min-w-75 max-w-[500px] animate-slide-in`}
        >
            <div className={config.iconColor}>{config.icon}</div>
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button 
            onClick={onClose} 
            className={`${config.textColor} hover:opacity-70 transition-opacity`} 
            aria-label="Close notification"
            >
                <FiX size={18}/>
            </button>
        </div>
    )
}

export default Toast
