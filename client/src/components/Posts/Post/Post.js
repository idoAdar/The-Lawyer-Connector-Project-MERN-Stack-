import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import * as postAction from '../../../store/actions/postActionType';
import CommentForm from '../Comments/CommentForm';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../../Spinner/spinner';
import classes from './Post.module.css';

const Post = props => {
    useEffect(() => {
        const postId = props.match.params.id;
        props.getPost(postId)
    }, [props.repos])

    return (
        <Fragment>
             <div className={classes.main_title}>
                <h1>Share with co-workers</h1>
                <p>Time To Meet New Frindes...</p>
                <i className="fas fa-chalkboard-teacher fa-2x"></i>
            </div>
            {!props.repos ? <Spinner /> : (
                <Fragment>
                    <div className={classes.back}>
                        <Link to="/posts">Back</Link>
                    </div>
                    <section key={props.repos._id} className={classes.post_container}>
                        <div className={classes.img_container}>
                            <img src={props.repos.avatar} alt="avatar" className={classes.img}/>
                            <p>{props.repos.name}</p>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.details}>
                                <p>{props.repos.text}</p>
                                <p>Posted on {props.repos.date}</p>
                            </div>
                        </div>
                    </section>
                    <CommentForm />
                </Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        repos: state.postReducer.repository,
        isLoading: state.postReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPost: (id) => dispatch(postAction.getPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));