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