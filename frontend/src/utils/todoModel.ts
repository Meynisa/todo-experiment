/**
 * Todo Type Definitions - TypeScript Interfaces and Types
 *
 * Central location for all TypeScript types used across the frontend.
 * Ensures type safety and consistency throughout the application.
 *
 * Types:
 * - TodoStatus: Enum-like const for status values (todo, in_progress, pending, done)
 * - Todo: Full todo entity from API (id, title, description, status, timestamps)
 * - TodoFormData: Shape for create/update form submissions
 * - Pagination: API pagination metadata (total, perPage, currentPage, lastPage)
 * - ApiResponse<T>: Generic wrapper for all API responses
 * - TodoState: Redux state shape for todo slice
 *
 * Used by: Almost all files in components, pages, services, and store
 */
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