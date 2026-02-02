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
