const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

let added_todos = 0;
redis.setAsync("added_todos", added_todos)
  .then(result => {
    console.log(result)
  })
  .catch(err =>{
    console.log(err);
  })

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
  let counter = await redis.getAsync("added_todos") 
  counter ++;
  await redis.setAsync("added_todos", counter)
  res.send(todo);
});

/* GET statistics */
router.get('/statistics', async (_, res) => {
  const counter = await redis.getAsync("added_todos")
  res.send({"added_todos": counter});
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
  try {
    res.send(req.todo); // Implement this
  } catch (error) {
    res.send(error.message)
  }  
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await req.todo.update({text: req.body.text})
  res.send(`Updated ${req.todo._id} Successfully`); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
