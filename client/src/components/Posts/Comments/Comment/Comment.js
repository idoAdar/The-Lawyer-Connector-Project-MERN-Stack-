import React,{ Fragment } from 'react';
import { connect } from 'react-redux';
import classes from './Comment.module.css';

const Comment = props => {
    return (
            <Fragment>
                {props.repository.comments.map(comment => {
                    return (
                    <section key={comment._id} className={classes.post_container}>
                        <div className={classes.img_container}>
                            <img src={comment.avatar} alt="avatar" className={classes.img}/>
                            <p>{comment.name}</p>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.details}>
                                <p>{comment.text}</p>
                                <p>Posted on {comment.date}</p>
                            </div>
                        </div>
                    </section>
                    )
                })}
            </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        repository: state.postReducer.repository
    }
}

export default connect(mapStateToProps)(Comment);