import Todo from '#models/todo_models'
import { DateTime } from 'luxon'
import { CreateTodoRequest, UpdateTodoRequest } from '../requests/todo_requests.js'

export default class TodoService {
  async all() {
    return Todo.query().whereNull('deleted_at')
  }

  async find(id: number) {
    return Todo.query().where('id', id).whereNull('deleted_at').firstOrFail()
  }

  async create(payload: CreateTodoRequest) {
    return Todo.create(payload)
  }

  async update(id: number, payload: UpdateTodoRequest) {
    const todo = await Todo.query().where('id', id).whereNull('deleted_at').firstOrFail()
    todo.merge(payload)
    return await todo.save()
  }

  async delete(id: number) {
    const todo = await Todo.query().where('id', id).whereNull('deleted_at').firstOrFail()
    todo.merge({ deletedAt: DateTime.now() })
    return await todo.save()
  }

  async stores(payload: CreateTodoRequest) {
    return await Todo.create(payload)
  }
}
