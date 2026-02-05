/**
 * todoApi - API Service Layer for Backend Communication
 *
 * Axios-based HTTP client for interacting with the backend todo API.
 * All methods return typed responses using ApiResponse<T> wrapper.
 *
 * Configuration:
 * - Base URL from VITE_API_BASE_URL env var (default: localhost:4000)
 * - Content-Type: application/json
 *
 * Methods:
 * - getAllTodo(page, limit): GET /todos - Paginated list
 * - getTodoById(id): GET /todos/:id - Single todo
 * - createTodo(data): POST /todos - Create new
 * - updateTodo(id, data): PUT /todos/:id - Update existing
 * - deleteTodo(id): DELETE /todos/:id - Remove todo
 *
 * Used by: Redux async thunks in todoSlice.ts
 */
import axios from "axios";
import type { ApiResponse, Todo, TodoFormData } from "../utils/todoModel";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const todoApi = {
    // Get all Todos with pagination
    getAllTodo: async (page: number = 1, limit: number = 10) => {
        const response = await api.get<ApiResponse<Todo[]>>('/todos', {
            params: { page, limit },
        })
        return response.data
    },

    // Get single Todo by ID
    getTodoById: async (id:number) => {
        const response = await api.get<ApiResponse<Todo>>(`/todos/${id}`)
        return response.data
    },

    // Create New Todo
    createTodo: async (data: TodoFormData) => {
        const response = await api.post<ApiResponse<Todo>>('/todos', data)
        return response.data
    },

    // Update existing Todo
    updateTodo: async (id: number, data: TodoFormData) => {
        const response = await api.put<ApiResponse<Todo>>(`/todos/${id}`, data)
        return response.data
    },

    // Delete Todo
    deleteTodo: async (id: number) => {
        const response = await api.delete<ApiResponse<void>>(`/todos/${id}`)
        return response.data
    },
}

export default todoApi