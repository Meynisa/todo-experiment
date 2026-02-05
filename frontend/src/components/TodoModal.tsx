/**
 * TodoModal - Modal Dialog for Create/Edit Todo
 *
 * A dual-mode modal component that handles both creating new todos
 * and editing existing ones. Automatically populates form data
 * when in edit mode.
 *
 * Props:
 * - mode: ModalMode.CREATE or ModalMode.EDIT
 * - todo: Todo object to edit (required for EDIT mode)
 * - isOpen: Controls modal visibility
 * - onClose: Callback when modal is closed
 * - onSubmit: Callback with form data (and todo ID for updates)
 * - loading: Disables form and shows loading state
 *
 * Features:
 * - Title validation (required, min 3 chars)
 * - Status selector (only shown in EDIT mode)
 * - Auto-resets form when opened in CREATE mode
 *
 * Exports: ModalMode constant for mode type safety
 */
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { TodoStatus, type Todo, type TodoFormData } from "../utils/todoModel";

export const ModalMode = {
  CREATE: 'create',
  EDIT: 'edit',
} as const

export type ModalMode = typeof ModalMode[keyof typeof ModalMode]

interface TodoModalProps {
    mode: ModalMode
    todo?: Todo | null
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: TodoFormData, id?: number) => void
    loading: boolean
}

const TodoModal: React.FC<TodoModalProps> = ({ mode, todo, isOpen, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState<TodoFormData>({
        title: '',
        description: '',
        status: TodoStatus.TODO
    })

    const [errors, setErrors] = useState<{ title?: string }>({})

    const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
    if (isOpen && !prevIsOpen) {
        setPrevIsOpen(true)
        if (mode === ModalMode.EDIT && todo) {
            setFormData({
                title: todo.title,
                description: todo.description,
                status: todo.status,
            })
        } else if (mode === ModalMode.CREATE) {
            setFormData({
                title: '',
                description: '',
                status: TodoStatus.TODO,
            })
        }
        setErrors({})
    } else if (!isOpen && prevIsOpen) {
        setPrevIsOpen(false)
    }

    const validate = (): boolean => {
        const newErrors: { title?: string } = {}

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        } else if (formData.title.trim().length < 3) {
            newErrors.title = "Title must be at most 3 characters"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (!validate()) return

        if (mode === ModalMode.EDIT && todo) {
            onSubmit(formData, todo.id)
        } else {
            onSubmit({title: formData.title, description: formData.description})
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    if (!isOpen) return null

    const isEdit = mode === ModalMode.EDIT
    
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background */}
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{isEdit ? "Edit Todo" : "Create Todo"}</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-blue-700 rounded-lg p-1 transition-colors"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="modal-title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="modal-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter todo title"
                disabled={loading}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="modal-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="modal-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter todo description"
                disabled={loading}
              />
            </div>

            {isEdit && (
              <div>
                <label htmlFor="modal-status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="modal-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value={TodoStatus.TODO}>To Do</option>
                  <option value={TodoStatus.IN_PROGRESS}>In Progress</option>
                  <option value={TodoStatus.PENDING}>Pending</option>
                  <option value={TodoStatus.DONE}>Done</option>
                </select>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isEdit ? "Update Todo" : "Create Todo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default TodoModal