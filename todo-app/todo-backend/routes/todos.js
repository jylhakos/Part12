const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

// 12.7
/* GET TODO by ID. */
router.get('/:id', async (req, res) => {

  const { id } = req.params;

  console.log('GET', id);

  const todo = await Todo.findById(id);

  res.send(todo);

});

// 12.7
/* PUT to update TODO. */
router.put('/:id', async (req, res, next) => {

  console.log('req.params', req.params);

  const { id } = req.params;

  const body = req.body;

  const todo = {
    text: body.text,
    done: body.done
  };

  console.log('PUT', id, todo);

  const updated = await Todo.findByIdAndUpdate(
    { _id: id },
    todo,
    { new: true }
  )

  res.json(updated);

});

// 12.7
// $ curl -X PUT --header "Content-Type: application/json" --data '{ "_id": "6163a3c0633b29d06b79725c", "text":"Learn about containers", "done": "true" }' http://localhost:3000/todos/6163a3c0633b29d06b79725c

/* GET TODO listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST TODO to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE TODO. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET TODO. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT TODO. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
