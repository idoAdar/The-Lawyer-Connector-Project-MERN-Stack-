const express = require('express');
const isAuth = require('../../middleware/isAuth');
const { body, validationResult } = require('express-validator'); 
const postController = require('../../controller/postController');

const route = express.Router();

// url: http://localhost:5000/api/posts
// method: POST
// desc: Create new post
// Private
route.post('/',
    [
        isAuth,
        body('text', 'Please enter some text for setting a post').notEmpty()
    ], 
    postController.postPost);

// url: http://localhost:5000/api/posts/all
// method: GET
// desc: Fetching posts
// Private
route.get('/all', isAuth, postController.getAll);

// url: http://localhost:5000/api/posts/:postId
// method: GET
// desc: Fetching single post
// Private
route.get('/:postId', isAuth, postController.getOne);

// url: http://localhost:5000/api/posts/:postId
// method: DELETE
// desc: Remove single post
// Private
route.delete('/:postId', isAuth, postController.deleteOne);

// url: http://localhost:5000/api/posts/like/:postId
// method: PUT
// desc: Like a post
// Private
route.put('/like/:postId', isAuth, postController.putLike);

// url: http://localhost:5000/api/posts/unlike/:postId
// method: PUT
// desc: Unliked a post
// Private
route.put('/unlike/:postId', isAuth, postController.putUnlike);

// url: http://localhost:5000/api/posts/comment/:postId
// method: POST
// desc: Add comment to post
// Private
route.put('/comment/:postId', 
    [
        isAuth,
        body('text', 'Comment should include some text').notEmpty()
    ], 
    postController.postComment);

// url: http://localhost:5000/api/posts/comment_remove/:postId/:commentId
// method: DELETE
// desc: Delete comment on post
// Private
route.delete('/comment_remove/:postId/:commentId', isAuth, postController.deleteComment);

module.exports = route;