/**
 * Loading - Spinner Component for Loading States
 *
 * A simple animated loading indicator with a spinning circle
 * and "Loading Todos..." text. Uses CSS animation for the spinner.
 *
 * No props required - renders a centered loading UI.
 *
 * Used in: TodoListPage.tsx during initial data fetch
 */
import type React from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading Todos...</p>
        </div>
    )
}

export default Loading