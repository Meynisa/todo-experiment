/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TodosController = () => import('#controllers/todos_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.get('todos', [TodosController, 'index'])
        router.get('todos/:id', [TodosController, 'show'])
        router.post('todos', [TodosController, 'store'])
        router.put('todos/:id', [TodosController, 'update'])
        router.delete('todos/:id', [TodosController, 'destroy'])
      })
      .prefix('/v1')
  })
  .prefix('api')
