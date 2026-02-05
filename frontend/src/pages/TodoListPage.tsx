import { useEffect, useState } from "react"
import { useToast } from "../hooks/useToast"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { type Todo, type TodoFormData } from "../utils/todoModel"
import TodoModal, { ModalMode } from "../components/TodoModal"
import { createTodo, deleteTodo, fetchAllTodos, setCurrentPage, setLimit, updateTodo } from "../store/todoSlice"
import ToastContainer from "../components/ToastContainer"
import { FiPlus } from "react-icons/fi"
import Loading from "../components/Loading"
import EmptyState from "../components/EmptyState"
import TodoCard from "../components/TodoCard"
import PaginationComponent from "../components/Pagination"
import DeleteModal from "../components/DeleteModal"

interface DeleteConfirmState {
    isOpen: boolean
    todo?: Todo | null
}

export default function TodoListPage(){
    const dispatch = useAppDispatch()
    
    const { todos, meta, loading, error, currentPage, limit } = useAppSelector(
        (state) => state.todos
    )
    
    const { toasts, removeToast, showSuccess, showError } = useToast()

    const [ selectedTodo, setSelectedTodo ] = useState<Todo | null> (null)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ modalMode, setModalMode ] = useState<ModalMode>(ModalMode.CREATE)
    const [ deleteConfirm, setDeleteConfirm ] = useState<DeleteConfirmState>({isOpen: false, todo: null})

    useEffect(() => {
        dispatch(fetchAllTodos({page: currentPage, limit}))
    }, [dispatch, currentPage, limit])

    // Handle Create Todo
    const handleCreateTodo = async (data: TodoFormData) => {
        try {
            await dispatch(createTodo(data)).unwrap()
            showSuccess('Todo created successfully!')
            setIsModalOpen(false)
            // Refresh the list
            dispatch(fetchAllTodos({page: currentPage, limit}))
        } catch (error: unknown) {
            showError(error instanceof Error ? error.message : 'Failed to create todo')
        }
    }

    // Handle Edit Todo
    const handleEditTodo = (todo: Todo) => {
        setSelectedTodo(todo)
        setModalMode(ModalMode.EDIT)
        setIsModalOpen(true)
    }

    // Handle Update Todo
    const handleUpdateTodo = async (data: TodoFormData, id?: number) => {
        try {
            if (!id) {
                showError("Todo ID is required for update")
                return;
            }
            await dispatch(updateTodo({id, data})).unwrap()
            showSuccess("Todo Updated Successfully")
            setIsModalOpen(false)
            setSelectedTodo(null)
        } catch (error: unknown) {
            showError(error instanceof Error ? error.message : 'Failed to create todo')
        }
    }

    // Handle Delete Todo
    const handleDeleteClick = (todo: Todo) => {
        setDeleteConfirm({ isOpen: true, todo })
    }

    // Handle Delete Confirm
    const handleDeleteConfirm = async () => {
        if (deleteConfirm.todo) {
            try {
                await dispatch(deleteTodo(deleteConfirm.todo.id)).unwrap()
                showSuccess("Todo deleted successfully!")
                setDeleteConfirm({ isOpen: false, todo: null})
                // Refresh the list if current page is empty after delete
                if (todos.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                } else {
                    dispatch(fetchAllTodos({ page: currentPage, limit }))
                }
            } catch (error: unknown) {
                showError(error instanceof Error ? error.message : 'Failed to create todo')
            }
        }
    }

    // Handle Page Change
    const handlePageChanges = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    // Handle Limit Changes
    const handleLimitChanges = (newLimit: number) => {
        dispatch(setLimit(newLimit))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Toast Notification */}
            <ToastContainer toasts={toasts} onRemoveToast={removeToast}/>
            {/* Header */}
            <header className="bg-blue-600 text-white py-6 px-8 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Todo Management</h1>
                    <button
                    onClick={() => {
                        setSelectedTodo(null)
                        setModalMode(ModalMode.CREATE)
                        setIsModalOpen(true)
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    >
                        <FiPlus size={20} />
                        Add New Todo
                    </button>
                </div>
            </header>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-8 py-8">
                {/* Error Message */}
                { error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                {/* Loading State */}
                {loading && todos.length === 0 && <Loading/>}

                {/* Empty State */}
                {!loading && todos.length === 0 && <EmptyState/>}

                {/* Todo List Grid */}
                {todos.length > 0 && (
                    <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {todos.map((todo) => (
                            <TodoCard
                            key={todo.id}
                            todo={todo}
                            onEdit={handleEditTodo}
                            onDelete={handleDeleteClick}
                            />
                        ))}
                    </div>
                    {/* Pagination */}
                    {meta && (
                        <PaginationComponent
                        meta={meta}
                        currentPage={currentPage}
                        onPageChange={handlePageChanges}
                        limit={limit}
                        onLimitChange={handleLimitChanges}
                        />
                    )}
                    </>
                )}
            </main>

            {/* Create/ Edit Modal */}
            <TodoModal
            mode={modalMode}
            todo={selectedTodo}
            isOpen={isModalOpen}
            onClose={() => {
                setIsModalOpen(false)
                setSelectedTodo(null)
            }}
            onSubmit={modalMode === ModalMode.EDIT ? handleUpdateTodo : handleCreateTodo}
            loading={loading}
            />
            {/* Delete Confirmation Modal */}
            <DeleteModal
            isOpen={deleteConfirm.isOpen}
            onClose={() => setDeleteConfirm({ isOpen: false, todo: null })}
            onConfirm={handleDeleteConfirm}
            loading={loading}
            todoTitle={deleteConfirm.todo?.title || ''}
            />
        </div>
    )
}