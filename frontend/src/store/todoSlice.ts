/**
 * todoSlice - Redux Slice for Todo State Management
 *
 * Contains all Redux logic for managing todos including async thunks
 * for API calls and reducers for state updates.
 *
 * State Shape (TodoState):
 * - todos: Array of Todo items
 * - meta: Pagination metadata from API
 * - loading: Boolean for async operation status
 * - error: Error message string or null
 * - currentPage: Active page number
 * - limit: Items per page
 *
 * Async Thunks:
 * - fetchAllTodos: Load paginated todo list
 * - fetchTodoById: Load single todo (unused currently)
 * - createTodo: Add new todo
 * - updateTodo: Modify existing todo
 * - deleteTodo: Remove todo by ID
 *
 * Sync Reducers:
 * - setCurrentPage: Change pagination page
 * - setLimit: Change items per page (resets to page 1)
 * - clearError: Reset error state
 */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import todoApi from '../services/todoApi';
import { type TodoFormData, type TodoState } from '../utils/todoModel';

const initialState: TodoState = {
    todos: [],
    meta: null,
    loading: false,
    error: null,
    currentPage: 1,
    limit: 10,
}

export const fetchAllTodos = createAsyncThunk(
    'todos/fetchAllTodos',
    async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
        try {
            const response = await todoApi.getAllTodo(page, limit)
            return response
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch all todos data'
            return rejectWithValue(errorMessage)
        }
    }
)

export const fetchTodoById = createAsyncThunk(
    'todos/fetchTodoById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await todoApi.getTodoById(id)
            return response
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : `Failed to fetch id todo ${id}`
            return rejectWithValue(errorMessage)
        }
    }
)

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (data: TodoFormData, { rejectWithValue }) => {
        try {
            const response = await todoApi.createTodo(data)
            return response.data
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create todo"
            return rejectWithValue(errorMessage)
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, data }: {id: number, data: TodoFormData }, { rejectWithValue }) => {
        try {
            const response = await todoApi.updateTodo(id, data)
            return response.data
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update todo"
            return rejectWithValue(errorMessage)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { rejectWithValue }) => {
        try {
            await todoApi.deleteTodo(id)
            return id
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : `Failed to delete todo id ${id}`
            return rejectWithValue(errorMessage)
        }
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload
            state.currentPage = 1
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Fetch All Todos
        builder
        .addCase(fetchAllTodos.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchAllTodos.fulfilled, (state, action) => {
            state.loading = false
            state.todos = action.payload.data
            state.meta = action.payload.meta || null
        })
        .addCase(fetchAllTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        //Create Todo
        builder
        .addCase(createTodo.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todos.unshift(action.payload) // Add new todo to the beginning of the list
        })
        .addCase(createTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        // Update Todo
        builder
        .addCase(updateTodo.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
            state.loading = false
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id ) // Find the todo index
            if (index !== -1) {
                state.todos[index] = action.payload // replace the element
            }
        })
        .addCase(updateTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        // Delete Todo
        builder
        .addCase(deleteTodo.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todos = state.todos.filter((todo) => todo.id !== action.payload) // Keep Todo only if its id is not equal to action.payload
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export const { setCurrentPage, setLimit, clearError } = todoSlice.actions
export default todoSlice.reducer