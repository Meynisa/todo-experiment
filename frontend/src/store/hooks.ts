/**
 * Redux Typed Hooks - Type-Safe Hooks for Store Access
 *
 * Pre-typed versions of useDispatch and useSelector that include
 * the correct types for this application's Redux store.
 *
 * Exports:
 * - useAppDispatch: Typed dispatch hook (knows about async thunks)
 * - useAppSelector: Typed selector hook (knows about RootState shape)
 *
 * Usage:
 *   const dispatch = useAppDispatch()
 *   const { todos, loading } = useAppSelector(state => state.todos)
 *
 * Why: Avoids repeating type annotations when using Redux hooks
 */
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector