import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classes from './ProfileEducation.module.css';

const ProfileEducaion = props => {
    return (
        <section>
            <h3 className={classes.education_title}><i className="fas fa-graduation-cap"></i> Education</h3>
            {props.education.length > 0 ? (
                <Fragment>
                    {props.education.map(edu => {
                        return (
                            <div key={edu._id} className={classes.education_container}>
                                <p>School: {edu.school}</p>
                                <p>Degree: {edu.degree}</p>
                                <p>Since: {edu.from}</p>
                                {edu.to ? (
                                    <p>Till: {edu.to}</p>
                                ) : ('')}
                                {edu.description ? (
                                    <p>Description: {edu.description}</p>
                                ) : ('')}
                            </div>
                        )
                    })}
                </Fragment>
            ) : (
                <div className={classes.education_container}>
                    <p>No Education Added</p>
                </div>)}
        </section>
    )
}

const mapStateToProps = state => {
    return {
        education: state.profileReducer.repository.education
    }
}

export default connect(mapStateToProps, null)(ProfileEducaion);