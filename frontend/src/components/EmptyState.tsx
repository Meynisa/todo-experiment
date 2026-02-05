import React from 'react'
import { FiInbox } from 'react-icons/fi'

interface EmptyStateProps {
    message?: string
    description?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
    message = 'No Todos Found',
    description = "You haven't created any todos yet. Click the 'Add New Todo' button to get started",
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FiInbox size={48} className="text-gray-400"/>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{message}</h3>
            <p className='text-gray-500 text-center max-w-md'>{description}</p>
        </div>
    )
}

export default EmptyState