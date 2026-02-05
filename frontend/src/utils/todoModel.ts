export const TodoStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  PENDING: 'pending',
  DONE: 'done',
} as const

export type TodoStatus = typeof TodoStatus[keyof typeof TodoStatus]

export interface Todo {
    id: number
    title: string
    description: string
    status: TodoStatus
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

export interface TodoFormData {
    title: string
    description?: string
    status?: TodoStatus
}

export interface Pagination {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
}

export interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
    meta?: Pagination
}

export interface TodoState {
    todos: Todo[]
    meta: Pagination | null
    loading: boolean
    error: string | null
    currentPage: number
    limit: number
}