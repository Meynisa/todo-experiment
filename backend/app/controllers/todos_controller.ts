import TodoService from '#services/todo_service'
import {
  createTodoValidator,
  updateTodoValidator,
  listTodosValidator,
} from '#validators/todo_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TodosController {
  constructor(private todoService: TodoService) {}

  async index({ request, response }: HttpContext) {
    try {
      const query = await request.validateUsing(listTodosValidator)
      const todo = await this.todoService.all(query.page, query.limit)

      return response.ok({
        success: true,
        data: todo.all(),
        meta: todo.getMeta(),
      })
    } catch (error) {
      console.error(error)
      return response.notFound({
        success: false,
        message: 'Todo Not Found',
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const todo = await this.todoService.find(params.id)

      return response.ok({
        success: true,
        data: todo,
      })
    } catch (error) {
      console.error(error)
      return response.notFound({
        success: false,
        message: 'Todo Not Found',
      })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createTodoValidator)
      const todo = await this.todoService.create(payload)

      return response.created({
        success: true,
        message: 'Todo created successfully',
        data: todo,
      })
    } catch (error) {
      console.error(error)
      return response.unprocessableEntity({
        success: false,
        message:
          Array.isArray(error.messages) && error.messages.length > 0
            ? error.messages[0].message
            : 'Todo Failed to Create',
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateTodoValidator)
      const todo = await this.todoService.update(params.id, payload)

      return response.ok({
        success: true,
        message: 'Todo updated successfully',
        data: todo,
      })
    } catch (error) {
      console.error(error)
      return response.unprocessableEntity({
        success: false,
        message:
          Array.isArray(error.messages) && error.messages.length > 0
            ? error.messages[0].message
            : 'Todo Failed to Update',
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      await this.todoService.delete(params.id)

      return response.ok({
        success: true,
        message: 'Todo deleted successfully',
      })
    } catch (error) {
      console.error(error)
      return response.unprocessableEntity({
        success: false,
        message:
          Array.isArray(error.messages) && error.messages.length > 0
            ? error.messages[0].message
            : 'Todo Failed to Delete',
      })
    }
  }
}
