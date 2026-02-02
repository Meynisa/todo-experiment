import vine from '@vinejs/vine'
import { TodoStatus } from '../enums/todo_status.js'

export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3),
    description: vine.string().trim().escape().optional(),
    status: vine.enum(TodoStatus).optional(),
  })
)

export const updateTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).optional(),
    description: vine.string().trim().escape().optional(),
    status: vine.enum(TodoStatus).optional(),
  })
)

export const listTodosValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
  })
)
