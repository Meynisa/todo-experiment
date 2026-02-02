import { test } from '@japa/runner'
import TodoService from '#services/todo_service'
import { DateTime } from 'luxon'
import { TodoStatus } from '../../app/enums/todo_status.js'

test.group('TodoService - Unit Test', () => {
  let todoService: TodoService
  let mockTodoModel: any

  test('all() - should return paginated todos', async ({ assert }) => {
    const mockTodos = [
      { id: 1, title: 'Test Todo 1', description: 'Description 1', status: TodoStatus.TODO },
      { id: 2, title: 'Test Todo 2', description: 'Description 2', status: TodoStatus.DONE },
    ]

    const mockPaginationResult = {
      all: () => mockTodos,
      getMeta: () => ({
        total: 2,
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
      }),
    }

    mockTodoModel = {
      query: () => ({
        whereNull: (column: string) => ({
          paginate: async (page: number, limit: number) => {
            assert.equal(column, 'deleted_at')
            assert.equal(page, 1)
            assert.equal(limit, 10)
            return mockPaginationResult
          },
        }),
      }),
    }

    todoService = new TodoService(mockTodoModel)

    const result = await todoService.all(1, 10)

    assert.deepEqual(result.all(), mockTodos)
    assert.equal(result.getMeta().total, 2)
  })

  test('all() - should use default pagination values', async ({ assert }) => {
    const mockPaginationResult = {
      all: () => [],
      getMeta: () => ({ total: 0, perPage: 10, currentPage: 1, lastPage: 1 }),
    }

    mockTodoModel = {
      query: () => ({
        whereNull: () => ({
          paginate: async (page: number, limit: number) => {
            assert.equal(page, 1)
            assert.equal(limit, 10)
            return mockPaginationResult
          },
        }),
      }),
    }

    todoService = new TodoService(mockTodoModel)

    await todoService.all()
  })

  test('find() - should return a single todo by id', async ({ assert }) => {
    const mockTodo = {
      id: 1,
      title: 'Test Todo',
      description: 'Test Description',
      status: TodoStatus.TODO,
    }

    mockTodoModel = {
      query: () => ({
        where: (column: string, value: number) => ({
          whereNull: (nullColumn: string) => ({
            firstOrFail: async () => {
              assert.equal(column, 'id')
              assert.equal(value, 1)
              assert.equal(nullColumn, 'deleted_at')
              return mockTodo
            },
          }),
        }),
      }),
    }

    todoService = new TodoService(mockTodoModel)

    const result = await todoService.find(1)

    assert.deepEqual(result, mockTodo)
  })

  test('find() - should throw error when todo not found', async ({ assert }) => {
    mockTodoModel = {
      query: () => ({
        where: () => ({
          whereNull: () => ({
            firstOrFail: async () => {
              throw new Error('E_ROW_NOT_FOUND: Row not found')
            },
          }),
        }),
      }),
    }

    todoService = new TodoService(mockTodoModel)

    await assert.rejects(() => todoService.find(999), 'E_ROW_NOT_FOUND: Row not found')
  })

  test('create() - should create a new todo with all fields', async ({ assert }) => {
    const payload = {
      title: 'New Todo',
      description: 'New Description',
      status: TodoStatus.IN_PROGRESS,
    }

    const mockCreatedTodo = {
      id: 1,
      ...payload,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }

    mockTodoModel = {
      create: async (data: any) => {
        assert.equal(data.title, payload.title)
        assert.equal(data.description, payload.description)
        assert.equal(data.status, payload.status)
        return mockCreatedTodo
      },
    }

    todoService = new TodoService(mockTodoModel)

    const result = await todoService.create(payload)

    assert.deepEqual(result, mockCreatedTodo)
  })

  test('create() - should create todo with default status when not provided', async ({
    assert,
  }) => {
    const payload = {
      title: 'New Todo',
      description: 'New Description',
    }

    mockTodoModel = {
      create: async (data: any) => {
        assert.equal(data.status, TodoStatus.TODO)
        return { id: 1, ...data }
      },
    }

    todoService = new TodoService(mockTodoModel)

    await todoService.create(payload)
  })

  test('create() - should create todo without description', async ({ assert }) => {
    const payload = {
      title: 'New Todo',
    }

    mockTodoModel = {
      create: async (data: any) => {
        assert.equal(data.title, payload.title)
        assert.isUndefined(data.description)
        return { id: 1, ...data }
      },
    }

    todoService = new TodoService(mockTodoModel)

    await todoService.create(payload)
  })

  test('update() - should update an existing todo', async ({ assert }) => {
    const todoId = 1
    const payload = {
      title: 'Updated Title',
      description: 'Updated Description',
      status: TodoStatus.DONE,
    }

    const mockTodo = {
      id: todoId,
      title: 'Old Title',
      description: 'Old Description',
      status: TodoStatus.TODO,
      merge: (data: any) => {
        Object.assign(mockTodo, data)
      },
      save: async () => mockTodo,
    }

    mockTodoModel = {
      query: () => ({
        where: (column: string, value: number) => ({
          whereNull: (nullColumn: string) => ({
            firstOrFail: async () => {
              assert.equal(column, 'id')
              assert.equal(value, todoId)
              assert.equal(nullColumn, 'deleted_at')
              return mockTodo
            },
          }),
        }),
      }),
    }

    todoService = new TodoService(mockTodoModel)

    const result = await todoService.update(todoId, payload)

    assert.equal(result.title, payload.title)
    assert.equal(result.description, payload.description)
    assert.equal(result.status, payload.status)
  })

  test('update() - should partially update todo', async ({ assert }) => {
    const todoId = 1
    const payload = {
      status: TodoStatus.DONE,
    }

    const mockTodo = {
      id: todoId,
      title: 'Original Title',
      description: 'Original Description',
      status: TodoStatus.TODO,
      merge: (data: any) => {
        Object.assign(mockTodo, data)
      },
      save: async () => mockTodo,
    }

    mockTodoModel = {
      query: () => ({
        where: () => ({
          whereNull: () => ({
            firstOrFail: async () => mockTodo,
          }),
        }),
      }),
    }

    todoService = new TodoService(mockTodoModel)

    const result = await todoService.update(todoId, payload)

    assert.equal(result.title, 'Original Title')
    assert.equal(result.status, TodoStatus.DONE)
  })

  test('delete() - should soft delete a todo', async ({ assert }) => {
    const todoId = 1
    let deletedAtSet = false

    const mockTodo = {
      id: todoId,
      title: 'Todo to Delete',
      deletedAt: null,
      merge: (data: any) => {
        if (data.deletedAt) {
          deletedAtSet = true
          mockTodo.deletedAt = data.deletedAt
        }
      },
      save: async () => mockTodo,
    }

    mockTodoModel = {
      query: () => ({
        where: (column: string, value: number) => ({
          whereNull: (nullColumn: string) => ({
            firstOrFail: async () => {
              assert.equal(column, 'id')
              assert.equal(value, todoId)
              assert.equal(nullColumn, 'deleted_at')
              return mockTodo
            },
          }),
        }),
      }),
    }

    todoService = new TodoService(mockTodoModel)

    await todoService.delete(todoId)

    assert.isTrue(deletedAtSet)
    assert.isNotNull(mockTodo.deletedAt)
  })

  test('delete() - should throw error when todo not found', async ({ assert }) => {
    mockTodoModel = {
      query: () => ({
        where: () => ({
          whereNull: () => ({
            firstOrFail: async () => {
              throw new Error('Todo Not Found')
            },
          }),
        }),
      }),
    }

    todoService = new TodoService(mockTodoModel)

    await assert.rejects(() => todoService.delete(999), 'Todo Not Found')
  })
})
