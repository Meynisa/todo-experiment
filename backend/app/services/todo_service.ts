import Todo from '#models/todo_models'
import { DateTime } from 'luxon'
import { CreateTodoRequest, UpdateTodoRequest } from '../requests/todo_requests.js'
import { TodoStatus } from '../enums/todo_status.js'

export default class TodoService {
  async all(page: number = 1, limit: number = 10) {
    return Todo.query().whereNull('deleted_at').paginate(page, limit)
  }

  async find(id: number) {
    return Todo.query().where('id', id).whereNull('deleted_at').firstOrFail()
  }

  async create(payload: CreateTodoRequest) {
    const todo = await Todo.create({
      title: payload.title,
      description: payload.description,
      status: payload.status || TodoStatus.TODO,
    })
    return todo
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
}
