import vine from '@vinejs/vine'
import { TodoStatus } from '../enums/todo_status.js'

export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3),
    description: vine.string().trim().escape(),
  })
)

export const updateTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3),
    description: vine.string().trim().escape(),
    status: vine.enum(TodoStatus),
  })
)
