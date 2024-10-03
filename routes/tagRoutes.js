const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');
const Todo = require('../models/todo');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find().populate('todos');
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  const tag = new Tag({
    title: req.body.title
  });

  try {
    const newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete all tags
router.delete('/', async (req, res) => {
  try {
    await Tag.deleteMany();
    await Todo.updateMany({}, { $set: { tags: [] } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one tag
router.get('/:id', getTag, (req, res) => {
  res.json(res.tag);
});

// Delete one tag
router.delete('/:id', getTag, async (req, res) => {
  try {
    await res.tag.deleteOne();
    await Todo.updateMany({}, { $pull: { tags: res.tag._id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update one tag
router.patch('/:id', getTag, async (req, res) => {
  if (req.body.title != null) {
    res.tag.title = req.body.title;
  }

  try {
    const updatedTag = await res.tag.save();
    res.json(updatedTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get todos for a tag
router.get('/:id/todos', getTag, async (req, res) => {
  try {
    const todos = await Todo.find({ tags: res.tag._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getTag(req, res, next) {
  let tag;
  try {
    tag = await Tag.findById(req.params.id);
    if (tag == null) {
      return res.status(404).json({ message: 'Cannot find tag' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.tag = tag;
  next();
}

module.exports = router;