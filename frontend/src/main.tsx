/**
 * main.tsx - Application Entry Point
 *
 * This is the entry file that bootstraps the React application. It:
 * - Creates the React root using createRoot API (React 18+)
 * - Wraps the app in StrictMode for development checks
 * - Provides the Redux store to the entire application via Provider
 * - Imports global CSS styles (Tailwind)
 *
 * The component hierarchy from here:
 * React.StrictMode -> Provider (Redux) -> App -> TodoListPage
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
