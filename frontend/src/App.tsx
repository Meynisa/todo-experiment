/**
 * App - Root Application Component
 *
 * This is the main entry component that serves as the root of the React
 * component tree. It simply renders the TodoListPage as the main content.
 *
 * The app structure is intentionally simple:
 * - main.tsx handles Redux Provider setup
 * - App.tsx renders the main page
 * - TodoListPage contains all the todo management UI
 *
 * To add routing in the future, replace TodoListPage with a Router component.
 */
import TodoListPage from './pages/TodoListPage'

function App() {
  return (
    <TodoListPage/>
  )
}

export default App
