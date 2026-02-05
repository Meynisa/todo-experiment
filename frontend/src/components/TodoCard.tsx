import { FiCalendar, FiEdit2, FiTrash } from "react-icons/fi"
import type { Todo } from "../utils/todoModel"
import { formatDate } from "../utils/formatDate"
import StatusBadge from "./StatusBadge"

interface TodoCardProps {
    todo: Todo
    onEdit: (todo: Todo) => void
    onDelete: (todo: Todo) => void
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-blue-600 flex-1 pr-2">
                    {todo.title}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(todo)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        ariel-label="Edit Todo"
                    >
                        <FiEdit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(todo)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        ariel-label="Delete Todo"
                    >
                        <FiTrash size={18} />
                    </button>
                </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3 min-h-15">
                {todo.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                    <FiCalendar className="mr-2" size={16} />
                    <span>{formatDate(todo.createdAt)}</span>
                </div>
                <StatusBadge status={todo.status} />
            </div>
        </div>
    )
}

export default TodoCard