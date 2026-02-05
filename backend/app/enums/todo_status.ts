/**
 * TodoStatus - Enum defining the possible states of a todo item
 *
 * This enum is used throughout the application to ensure type-safe status values.
 * It's referenced by:
 * - models/todo_models.ts - for the status column type
 * - validators/todo_validators.ts - for validating incoming status values
 * - services/todo_service.ts - for setting default status on creation
 * - requests/todo_requests.ts - for typing request payloads
 */
export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  DONE = 'done',
}
