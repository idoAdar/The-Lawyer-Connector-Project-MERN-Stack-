import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as profileAction from '../../../store/actions/profileActionTypes';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../../Spinner/spinner';
import ProfileSkillsAndBio from './ProfilesSkillsAndBio/ProfileSkillsAndBio';
import ProfileExperience from './ProfileExperience/ProfileExperience';
import ProfileEducation from './ProfileEducation/ProfileEducation';
import classes from './profileById.module.css';

const ProfileById = props => {
    useEffect(() => {
        const id = props.match.params.id
        props.getProfile(id);
    }, [])

    return (
        <Fragment>
            {!props.repository ? <Spinner /> : <Fragment>
                <div className={classes.back}>
                    <Link to="/profiles">Back</Link>
                </div>
                <section className={classes.profile_container}>
                    <div>
                        <img className={classes.img} src={props.repository.user.avatar} alt="avatar"/>
                    </div>
                    <div className={classes.about}>
                        <h1>{props.repository.user.name}</h1>
                        <p>{props.repository.status}</p>
                        <small>{props.repository.company ? <span>At {props.repository.company}</span> : null}</small>
                    </div>
                    {props.repository.social ? (
                        <Fragment>
                            <div className={classes.social}>
                                {props.repository.social.facebook ? (
                                    <a href={props.repository.social.facebook}>
                                        <i className="fab fa-facebook-square fa-2x"></i>
                                    </a>
                                ) : ('')}
                                {props.repository.social.instegram ? (
                                    <a href={props.repository.social.instegram}>
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </a>
                                ) : ("")}
                                {props.repository.social.twitter ? (
                                    <a href={props.repository.social.twitter}>
                                        <i className="fab fa-twitter fa-2x"></i>
                                    </a>
                                ) : ('')}
                                {props.repository.social.youtube ? (
                                    <a href={props.repository.social.youtube}>
                                        <i className="fab fa-youtube fa-2x"></i>
                                    </a>
                                ) : ('')}
                                {props.repository.social.linkedIn ? (
                                    <a href={props.repository.social.linkedIn}>
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </a>
                                ) : ('')}
                            </div>
                        </Fragment>
                    ) : ('')}
                </section>
                <ProfileSkillsAndBio />
                <ProfileExperience />
                <ProfileEducation />
            </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        repository: state.profileReducer.repository
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: (id) => dispatch(profileAction.getProfileById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileById));