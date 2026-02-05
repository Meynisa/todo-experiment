/**
 * TodoService - Business Logic Layer for Todo Operations
 *
 * This service contains all business logic for todo CRUD operations, separating
 * it from the controller layer. It's injected into TodosController via DI.
 *
 * Methods:
 * - all(page, limit): Fetch paginated list of active (non-deleted) todos
 * - find(id): Get a single todo by ID (throws if not found or deleted)
 * - create(payload): Create a new todo with default status 'todo'
 * - update(id, payload): Update todo fields using merge()
 * - delete(id): Soft delete by setting deletedAt timestamp
 *
 * Design notes:
 * - Accepts injectable todoModel for testability (can mock in unit tests)
 * - All queries filter out soft-deleted records (whereNull('deleted_at'))
 * - Uses Lucid's firstOrFail() to throw 404 when record not found
 */
import Todo from '#models/todo_models'
import { DateTime } from 'luxon'
import { CreateTodoRequest, UpdateTodoRequest } from '../requests/todo_requests.js'
import { TodoStatus } from '../enums/todo_status.js'

export default class TodoService {
  private todoModel: any

  constructor(todoModel: any = Todo) {
    this.todoModel = todoModel
  }

  async all(page: number = 1, limit: number = 10) {
    return this.todoModel.query().whereNull('deleted_at').paginate(page, limit)
  }

  async find(id: number) {
    return this.todoModel.query().where('id', id).whereNull('deleted_at').firstOrFail()
  }

  async create(payload: CreateTodoRequest) {
    const todo = await this.todoModel.create({
      title: payload.title,
      description: payload.description,
      status: payload.status || TodoStatus.TODO,
    })
    return todo
  }

  async update(id: number, payload: UpdateTodoRequest) {
    const todo = await this.todoModel.query().where('id', id).whereNull('deleted_at').firstOrFail()
    todo.merge(payload)
    return await todo.save()
  }

  async delete(id: number) {
    const todo = await this.todoModel.query().where('id', id).whereNull('deleted_at').firstOrFail()
    todo.merge({ deletedAt: DateTime.now() })
    return await todo.save()
  }
}
