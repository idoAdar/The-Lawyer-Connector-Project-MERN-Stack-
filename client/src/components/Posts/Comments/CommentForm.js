import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as postAction from '../../../store/actions/postActionType';
import Comment from './Comment/Comment';
import classes from './CommentForm.module.css';

const CommentForm = props => {
    const [commentData, setCommentData] = useState('');

    const updateState = e => {
        e.preventDefault();
        setCommentData(e.target.value);
    }

    const create = e => {
        props.addComment(props.repository._id, commentData);
        setCommentData('');
    }

    return (
        <Fragment>
            <section className={classes.create_comment_container}>
                <div>
                    <p>Say Something...</p>
                </div>
                <textarea onChange={(e) => updateState(e)} value={commentData} placeholder="Add A Comment..." name="comment"></textarea>
                <button onClick={(e) => create(e)}>Submit</button>
            </section>
            {props.repository.comments ? (
                <Fragment>
                    <Comment />
                </Fragment>
            ) : ('')}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        repository: state.postReducer.repository
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (id, data) => dispatch(postAction.addComment(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);