import OperationFailedException from '#exceptions/operation_failed_exception'
import ResourceNotFoundException from '#exceptions/resource_not_found'
import Todo from '#models/todo_models'
import { createTodoRequest, updateTodoRequest } from '../requests/todo_requests'
import { DateTime } from 'luxon'

export default class TodoService {
  async all() {
    const todo = await Todo.query().whereNull('deletedAt')
    return todo
  }

  async find(id: number) {
    try {
      const todo = await Todo.findOrFail(id)
      return todo
    } catch (error) {
      console.error(error)
      throw new ResourceNotFoundException('Todo not found')
    }
  }

  async create(payload: createTodoRequest) {
    try {
      const todo = await Todo.create(payload)
      return todo
    } catch (error) {
      console.error(error)
      throw new OperationFailedException('Failed to create Todo')
    }
  }

  async update(id: number, payload: updateTodoRequest) {
    try {
      const todo = await Todo.findOrFail(id)
      todo.merge(payload)
      await todo.save()
      return { message: 'Todo updated successfully', data: todo }
    } catch (error) {
      console.error(error)
      throw new ResourceNotFoundException('Todo not found')
    }
  }

  async delete(id: number) {
    try {
      const todo = await Todo.findOrFail(id)
      todo.merge({ deletedAt: DateTime.now() })
      await todo.save()
      return { message: 'Todo deleted successfully' }
    } catch (error) {
      console.error(error)
      throw new ResourceNotFoundException('Todo not found')
    }
  }
}
