import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import * as postAction from '../../../store/actions/postActionType';
import { Link } from 'react-router-dom';
import CreatePost from '../CreatePost/CreatePost';
import Spinner from '../../Spinner/spinner';
import Alert from '../../AlertMechanism/alert';
import classes from './Posts.module.css';

const Posts = props => {
    useEffect(() => {
        props.fetchPosts();
    }, [])

    return (
            <Fragment>
                {props.isLoading ? <Spinner /> : (
                    <Fragment>
                        <Alert />
                        <div className={classes.main_title}>
                            <h1>Posts</h1>
                            <p><i className="fas fa-comments fa-2x"></i> Welcome to the community</p>
                            <CreatePost />
                        </div>
                        {props.posts.map(post => {
                            return (
                                <section key={post._id} className={classes.post_container}>
                                <div className={classes.img_container}>
                                    <img src={post.avatar} alt="avatar" className={classes.img}/>
                                    <p>{post.name}</p>
                                </div>
                                <div className={classes.content_container}>
                                    <div className={classes.details}>
                                        <p>{post.text}</p>
                                        <p>Posted on {post.date}</p>
                                    </div>
                                    <div className={classes.controller}>
                                        <button onClick={() => props.likePost(post._id)}>
                                                <i className="fas fa-thumbs-up">
                                                    <span>{post.likes.length > 0 ? post.likes.length : ''}</span>
                                                </i>
                                        </button>
                                        <button onClick={() => props.unlikePost(post._id)}>
                                            <i className="fas fa-thumbs-down"></i>
                                        </button>
                                        <Link to={`/posts/${post._id}`}
                                            >Discussion 
                                            <span>{' '}({post.comments.length})</span>
                                        </Link>
                                        {props.isAuth && post.user === props.user._id ? (
                                            <button onClick={() => props.deletePost(post._id)}>
                                                <i className="fas fa-minus-square"></i>
                                            </button>
                                        ) : ('')}
                                    </div>
                                </div>
                            </section>
                            )
                        })}
                    </Fragment>
                )}
            </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.postReducer.posts,
        isLoading: state.postReducer.isLoading,
        isAuth: state.registerReducer.isAuthenticated,
        user: state.registerReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(postAction.fetchPosts()),
        likePost: (id) => dispatch(postAction.likePost(id)),
        unlikePost: (id) => dispatch(postAction.unlikePost(id)),
        deletePost: (id) => dispatch(postAction.deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);