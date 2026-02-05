/**
 * TodoForm - Inline Form for Creating Todos
 *
 * A form component embedded in the page for quick todo creation.
 * Includes client-side validation and loading state handling.
 *
 * Features:
 * - Title field (required, min 3 chars)
 * - Description field (optional)
 * - Status dropdown selector
 * - Form resets after successful submission
 *
 * Props:
 * - onSubmit: Callback receiving TodoFormData when form is valid
 * - loading: Disables inputs and shows "Creating..." state
 *
 * Note: This is an alternative to TodoModal for inline creation.
 */
import React, { useState } from "react";
import { FiPlus } from 'react-icons/fi'
import { TodoStatus, type TodoFormData } from "../utils/todoModel";

interface TodoFormProps {
    onSubmit: (data: TodoFormData) => void;
    loading: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState<TodoFormData>({ title: "", description: "", status: TodoStatus.TODO });

    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    const validate = (): boolean => {
        const newErrors: { title?: string; description?: string } = {};
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }else if (formData.title.trim().length < 3) {
            newErrors.title = "Title must be at most 3 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
            // reset form after submit
            setFormData({ title: "", description: "", status: TodoStatus.TODO });
            setErrors({});
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Todo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter todo title"
                            disabled={loading}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>} 
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="status"
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
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Enter todo description (optional)"
                        disabled={loading}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                    <FiPlus size={20}/>
                    {loading ? 'Creating...' : 'Create Todo'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;