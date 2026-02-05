/**
 * Todo Request Interfaces - TypeScript Types for API Request Payloads
 *
 * These interfaces define the shape of incoming request data for todo operations.
 * They're used by TodoService to ensure type safety when processing requests.
 *
 * CreateTodoRequest:
 * - title: Required - the todo title
 * - description: Optional - detailed description
 * - status: Optional - defaults to 'todo' in TodoService
 *
 * UpdateTodoRequest:
 * - All fields optional - only provided fields will be updated (PATCH-like behavior)
 *
 * Note: These interfaces work alongside VineJS validators which handle
 * runtime validation. These provide compile-time type checking.
 */
import { TodoStatus } from '../enums/todo_status.js'

export interface CreateTodoRequest {
  title: string
  description?: string
  status?: TodoStatus
}

export interface UpdateTodoRequest {
  title?: string
  description?: string
  status?: TodoStatus
}
