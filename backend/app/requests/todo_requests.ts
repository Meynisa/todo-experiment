import { TodoStatus } from '../enums/todo_status.js'

export interface CreateTodoRequest {
  title: string
  description: string
}

export interface UpdateTodoRequest extends CreateTodoRequest {
  status: TodoStatus
}
