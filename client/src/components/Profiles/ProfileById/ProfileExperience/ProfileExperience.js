import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classes from './ProfileExperience.module.css';

const ProfileExperience = props => {
    return (
        <section>
            <h3 className={classes.experience_title}><i className="fas fa-briefcase"></i> Experience</h3>
            {props.experience.length > 0 ? (
                <Fragment>
                    {props.experience.map(exp => {
                        return (
                            <div key={exp._id} className={classes.experience_container}>
                                <p>Title: {exp.title}</p>
                                {exp.company ? (
                                    <p>At: {exp.company}</p>
                                ) : ('')}
                                {exp.location ? (
                                    <p>Location: {exp.location}</p>
                                ) : ('')}
                                {exp.from ? (
                                    <p>Since: {exp.from}</p>
                                ) : ('')}
                                {exp.to ? (
                                    <p>Till: {exp.to}</p>
                                ) : ('')}
                            </div>
                        )
                    })}
                </Fragment>
            ) : (
                <div className={classes.experience_container}>
                    <p>No Experience Added</p>
                </div>)}
        </section>
    )
}

const mapStateToProps = state => {
    return {
        experience: state.profileReducer.repository.experience
    }
}

export default connect(mapStateToProps, null)(ProfileExperience);