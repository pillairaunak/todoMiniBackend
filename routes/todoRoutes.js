const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const Tag = require('../models/tag');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().populate('tags');
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
    order: req.body.order
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete all todos
router.delete('/', async (req, res) => {
  try {
    await Todo.deleteMany();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one todo
router.get('/:id', getTodo, (req, res) => {
  res.json(res.todo);
});

// Delete one todo
router.delete('/:id', getTodo, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update one todo
router.patch('/:id', getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }
  if (req.body.completed != null) {
    res.todo.completed = req.body.completed;
  }
  if (req.body.order != null) {
    res.todo.order = req.body.order;
  }

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get tags for a todo
router.get('/:id/tags', getTodo, (req, res) => {
  res.json(res.todo.tags)
});




// Add a tag to a todo
router.post('/:id/tags', getTodo, async (req, res) => {

try {
  const todoId = req.params.id;
  const tagId  = req.body.id;  // Expecting tagId in the request body
  console.log(todoId)
  console.log(tagId)

  if (!tagId) {
    return res.status(400).json({ message: 'Tag ID is required in the request body' });
  }

  // Find the todo
  const todo = await Todo.findById(todoId);
  console.log(todo)
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  // Find the tag
  const tag = await Tag.findById(tagId);
  console.log(tag)
  if (!tag) {
    return res.status(404).json({ message: 'Tag not found' });
  }
  
  if (!todo.tags.includes(tagId)) {
    todo.tags.push(tagId);
    await todo.save();
  }
  
  if (!tag.todos.includes(todoId)) {
    tag.todos.push(todoId);
    await tag.save();
  }

  res.status(200).json({ 
    message: 'Tag associated with Todo successfully',
    todo: todo
  });
} catch (error) {
  res.status(500).json({ message: error.message });
}
});



// Remove all tags from a todo
router.delete('/:id/tags', getTodo, async (req, res) => {
  res.todo.tags = [];
  try {
    await res.todo.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a specific tag from a todo
router.delete('/:id/tags/:tag_id', getTodo, async (req, res) => {
  try {
    await res.todo.updateOne({
      $pull: { tags: req.params.tag_id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id).populate('tags');
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.todo = todo;
  next();
}

module.exports = router;