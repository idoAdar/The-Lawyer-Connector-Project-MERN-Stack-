const Post = require('../models/Post');
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); 

exports.postPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userDetails = await User.findById({ _id: req.user.id });
        const postFields = {
            user: req.user.id,
            text: req.body.text,
            name: userDetails.name,
            avatar: userDetails.avatar
        };
        const newPost = await Post(postFields);
        await newPost.save();
        return res.json(newPost);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const posts = await Post.find();
        const reverse = posts.reverse();
        return res.json(reverse);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    } 
}

exports.getOne = async (req, res, next) => {
    const params = req.params.postId;
    try {
        const post = await Post.findById({ _id: params });
        return res.json(post);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Post not found' });
    }
}

exports.deleteOne = async (req, res, next) => {
    const params = req.params.postId;
    try {
        const post = await Post.findOne({ _id: params });
        if (post.user.toString() !== req.user.id.toString()) {
            return res.status(400).json({ msg: 'Authorization denied' });
        }
        const postToRemove = await Post.findByIdAndRemove({ _id: params });
        return res.json(postToRemove);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Post not found' });
    }
}

exports.putLike = async (req, res, next) => {
    const params = req.params.postId;
    try {
        const post = await Post.findById(params);
        if (post.likes.filter(like => like.user.toString() === req.user.id.toString()).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.push({ user: req.user.id });
        await post.save();
        return res.json(post.likes);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}

exports.putUnlike = async (req, res, next) => {
    const params = req.params.postId;
    try {
        const post = await Post.findById(params);
        if (post.likes.filter(like => like.user.toString() === req.user.id.toString()).length === 0) {
            return res.status(400).json({ msg: 'Post has not been liked yet' });
        }
        const updateLikes = post.likes.filter(like => like.user.toString() !== req.user.id.toString());
        post.likes = updateLikes;
        await post.save();
        return res.json(post.likes);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}

exports.postComment = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const params = req.params.postId;
        const userDetails = await User.findById({ _id: req.user.id });
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: userDetails.name,
            avatar: userDetails.avatar
        };
        const post = await Post.findById({ _id: params });
        if (!post) {
            return res.status(400).json({ msg: 'Post does not exists' });
        }
        post.comments.unshift(newComment);
        await post.save();
        return res.json(post.comments);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}

exports.deleteComment = async (req, res, next) => {
    const params_post = req.params.postId;
    const params_comment = req.params.commentId;
    try {
        const post = await Post.findById({ _id: params_post });
        const comment = post.comments.find(comment => comment._id.toString() === params_comment.toString());

        if (!comment) {
            return res.status(400).json({ msg: 'Comment does not exists' });
        }
        if (comment.user.toString() !== req.user.id.toString()) {
            return res.status(400).json({ msg: 'Authorization denied' });
        }

        const updateComments = post.comments.filter(comment => comment._id.toString() !== params_comment.toString());
        post.comments = updateComments;
        await post.save();
        return res.json(post.comments);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}