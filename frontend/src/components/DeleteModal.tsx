import { FiAlertTriangle } from "react-icons/fi"

interface DeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
    todoTitle: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, loading, todoTitle }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">

            {/*Background*/}
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}/>
            
            {/*Modal*/}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                            <FiAlertTriangle className="text-red-600" size={24}/>                            
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Todo</h3>
                            <p className="text-gray-600 mb-1">
                                Are you sure you want to delete the todo "<span className="font-medium">{todoTitle}</span>"?
                            </p>
                            <p className="text-gray-600 mb-4">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal