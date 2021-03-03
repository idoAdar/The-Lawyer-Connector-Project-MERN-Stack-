import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as postAction from '../../../store/actions/postActionType';
import classes from './CreatePost.module.css';

const CreatePost = props => {
    const [postData, setPostData] = useState('');

    const updateState = e => {
        setPostData(e.target.value);
    }

    const create = e => {
        e.preventDefault();
        props.sendPost(postData);
        setPostData('');
    }

    return (
        <section className={classes.create_post_container}>
            <div>
                <p>Say Something...</p>
            </div>
            <textarea onChange={(e) => updateState(e)} value={postData} placeholder="Create new post..." name="post"></textarea>
            <button onClick={(e) => create(e)}>Submit</button>
        </section>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendPost: (data) => dispatch(postAction.createPost(data))
    }
}

export default connect(null, mapDispatchToProps)(CreatePost);