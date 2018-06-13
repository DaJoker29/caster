const { Router } = require('express');
const { Post } = require('../models');

const router = new Router();

router.get('/posts', returnPosts);
router.post('/posts', createPost); // Add Auth

module.exports = router;

async function createPost(req, res, next) {
  const { title, content, description, author, categories } = req.body;

  try {
    // TODO: Generate tags here
    const created = await Post.create({
      title,
      content,
      description,
      author,
      categories
    });
    const result = created;
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function returnPosts(req, res, next) {
  let posts = [];
  try {
    posts = await Post.find()
      .populate('author')
      .populate('categories');
    res.json(posts);
  } catch (e) {
    next(e);
  }
}
