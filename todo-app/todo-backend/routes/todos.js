const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router()
const { setAsync, getAsync } = require('../redis/index')

let cnt = 0;

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  cnt = await getAsync('added_todos')
  cnt++;
  await setAsync('added_todos', cnt)
  res.send(todo);

});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(200).send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { id } = req.params
  const newTodo = {
    text: req.todo.text,
    done: !req.todo.done
  }
  const updated = await Todo.findByIdAndUpdate(
    req.todo._id,
    newTodo,
    { new: true }
  )
  res.send(updated)

});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
