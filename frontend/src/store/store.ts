/**
 * Redux Store Configuration
 *
 * Central store setup using Redux Toolkit's configureStore.
 * Combines all reducers and exports type definitions for TypeScript.
 *
 * Current Reducers:
 * - todos: Manages todo list, pagination, loading, and error states
 *
 * Type Exports:
 * - RootState: Type of the entire Redux state tree
 * - AppDispatch: Type of the dispatch function (includes thunk support)
 *
 * The store is provided to the app in main.tsx via React-Redux Provider.
 */
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice'

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch