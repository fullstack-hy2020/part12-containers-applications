const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const { getAsync, setAsync } = require('../redis')

router.get('/statistics', async (_, res) => {
  const count = await getAsync('count')

  return res.json({ added_todos: count || '0' })
})

/* GET todos listing. */
router.get('/', async (_, res) => {
  console.log('Hello in get todos con Marc')
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todoCounter = async () => {
    const count = await getAsync('count')

    return count ? setAsync('count', parseInt(count) + 1) : setAsync('count', 1)
  }

  todoCounter()
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  if (todo) {
    return res.json(todo)
  }
  res.sendStatus(405) // Implement this
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    // Extraer solo los campos relevantes del cuerpo de la solicitud
    const { text, done } = req.body

    // Actualizar el todo en la base de datos
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.todo._id, // ID del todo a actualizar
      { text, done }, // Campos a actualizar
      { new: true, useFindAndModify: false }, // Opciones de configuración
    )

    // Verificar si se actualizó correctamente
    if (updatedTodo) {
      return res.json(updatedTodo) // Devolver el todo actualizado
    } else {
      return res.sendStatus(404) // Devolver 404 si el todo no se encontró
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno del servidor' }) // Manejar errores internos del servidor
  }
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
