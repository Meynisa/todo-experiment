import TodoService from '#services/todo_service'
import { createTodoValidator, updateTodoValidator } from '#validators/todo_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TodosController {
  constructor(private todoService: TodoService) {}

  async index({ response }: HttpContext) {
    try {
      const todo = await this.todoService.all()
      response.send({ data: todo })
    } catch (error) {
      console.error(error)
      response.status(422).send({ message: 'Todo not found' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const todo = await this.todoService.find(params.id)
      response.send({ data: todo })
    } catch (error) {
      console.error(error)
      response.status(404).send({ message: 'Todo not found' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createTodoValidator)
      const todo = await this.todoService.create(payload)
      response.status(201).send({ data: todo })
    } catch (error) {
      console.error(error)
      if (Array.isArray(error.messages) && error.messages.length > 0) {
        response.status(422).send({ message: error.messages[0].message })
      } else {
        response.status(422).send({ message: 'Todo Not Created' })
      }
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateTodoValidator)
      const todo = await this.todoService.update(params.id, payload)
      response.send({ message: 'Todo updated successfully', data: todo })
    } catch (error) {
      console.error(error)
      if (Array.isArray(error.messages) && error.messages.length > 0) {
        response.status(422).send({ message: error.messages[0].message })
      } else {
        response.status(422).send({ message: 'Todo Not Updated' })
      }
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      await this.todoService.delete(params.id)
      response.send({ message: 'Todo deleted successfully' })
    } catch (error) {
      if (Array.isArray(error.messages) && error.messages.length > 0) {
        response.status(422).send({ message: error.messages[0].message })
      } else {
        response.status(422).send({ message: 'Todo Not Deleted' })
      }
    }
  }
}
