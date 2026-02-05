/**
 * Todo Model - Lucid ORM Entity for the todos table
 *
 * This model represents a todo item in the database and defines the schema
 * for the todos table. It uses AdonisJS Lucid ORM decorators for column mapping.
 *
 * Columns:
 * - id: Primary key (auto-increment)
 * - title: Todo title (required)
 * - description: Optional detailed description
 * - status: Current state using TodoStatus enum
 * - createdAt: Auto-set on record creation
 * - updatedAt: Auto-updated on any modification
 * - deletedAt: Soft delete timestamp (null = active, DateTime = deleted)
 *
 * Note: This model implements soft delete pattern - records are never truly
 * deleted, instead deletedAt is set to mark them as removed.
 */
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { TodoStatus } from '../enums/todo_status.js'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare status: TodoStatus

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
