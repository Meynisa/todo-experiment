/**
 * StatusBadge - Colored Badge for Todo Status
 *
 * Renders a pill-shaped badge with color coding based on todo status:
 * - TODO (yellow): "To Do"
 * - IN_PROGRESS (blue): "In Progress"
 * - PENDING (orange): "Pending"
 * - DONE (green): "Done"
 *
 * Props:
 * - status: TodoStatus enum value
 *
 * Used in: TodoCard.tsx to display the current status of each todo
 */
import { TodoStatus } from "../utils/todoModel";

interface StatusBadgeProps {
    status: TodoStatus
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusConfig = () => {
        switch (status) {
            case TodoStatus.TODO:
                return {
                    label: "To Do",
                    className: "bg-yellow-200 text-yellow-700"
                }
            case TodoStatus.IN_PROGRESS:
                return {
                    label: "In Progress",
                    className: "bg-blue-200 text-blue-700"}
            case TodoStatus.PENDING:
                return {
                    label: "Pending",
                    className: "bg-orange-200 text-orange-700"
                }
            case TodoStatus.DONE:
                return {
                    label: "Done",
                    className: "bg-green-200 text-green-700"
                }
            default:
                return {
                    label: status,
                    className: "bg-gray-200 text-gray-700"
                }
                
        }
    }

    const config = getStatusConfig()

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
        >
            {config.label}
        </span>
    )
}

export default StatusBadge