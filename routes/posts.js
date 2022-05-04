const express = require('express');

const router = express.Router();

const addPost = require('../controllers/post/addPost');
const patchPost = require('../controllers/post/patchPost');
const { getPosts, getPost } = require('../controllers/post/getPost');
const { deletePosts, deletePost } = require('../controllers/post/deletePost');

router.get('/', (req, res) => {
  getPosts({
    req,
    res,
  });
});

router.get('/:id', (req, res) => {
  getPost({
    req,
    res,
  });
});

router.post('/', (req, res) => {
  addPost({
    req,
    res,
  });
});

router.delete('/', (req, res) => {
  deletePosts({
    req,
    res,
  });
});

router.delete('/:id', (req, res) => {
  deletePost({
    req,
    res,
  });
});

router.patch('/:id', (req, res) => {
  patchPost({
    req,
    res,
  });
});

module.exports = router;
