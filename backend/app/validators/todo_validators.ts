/**
 * Todo Validators - VineJS Request Validation Schemas
 *
 * These validators define the validation rules for incoming API requests.
 * They're used in TodosController via request.validateUsing() to ensure
 * data integrity before processing.
 *
 * Validators:
 * - createTodoValidator: For POST /todos
 *   - title: required, min 3 chars
 *   - description: optional, HTML escaped for XSS prevention
 *   - status: optional, must be valid TodoStatus enum value
 *
 * - updateTodoValidator: For PUT /todos/:id
 *   - Same rules as create, but all fields optional
 *
 * - listTodosValidator: For GET /todos query params
 *   - page: optional, min 1
 *   - limit: optional, min 1, max 100
 *
 * Note: vine.compile() pre-compiles schemas for better performance.
 */
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
