import TodoService from '#services/todo_service'
import { createTodoValidator, updateTodoValidator } from '#validators/todo_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TodosController {
  constructor(private todoService: TodoService) {}

  async index() {
    return this.todoService.all()
  }

  async show({ params }: HttpContext) {
    return this.todoService.find(params.id)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createTodoValidator)
    return this.todoService.create(payload)
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateTodoValidator)
    return this.todoService.update(params.id, payload)
  }

  async destroy({ params }: HttpContext) {
    return this.todoService.delete(params.id)
  }
}
