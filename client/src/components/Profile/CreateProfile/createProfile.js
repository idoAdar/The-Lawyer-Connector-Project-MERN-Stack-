import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as profileAction from '../../../store/actions/profileActionTypes';
import Alert from '../../AlertMechanism/alert';
import classes from './createProfile.module.css';

const CreateProfile = props => {
    const [socialState, setSocialState] = useState(false);
    const [formState, setFormState] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instegram: '',
    });

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const save = e => {
        e.preventDefault();
        props.sendData(formState, props.history);
    }

    const openSocialTags = () => {
        setSocialState(!socialState);
    }

    const backHandler = () => {
        props.history.push('/dashboard');
    }

    let socialInputs = null;
    if (socialState) {
        socialInputs = <Fragment>
             <div className={classes.social_media}>
                    <i className="fab fa-twitter fa-2x"></i>
                    <input onChange={e => updateState(e)} value={formState.twitter} type="text" placeholder="Twitter URL" name="twitter"/>
                </div>
                <div className={classes.social_media}>
                    <i className="fab fa-facebook fa-2x"></i>
                    <input onChange={e => updateState(e)} value={formState.facebook} type="text" placeholder="Facebook URL" name="facebook"/>
                </div>
                <div className={classes.social_media}>
                    <i className="fab fa-youtube fa-2x"></i>
                    <input onChange={e => updateState(e)} value={formState.youtube} type="text" placeholder="Youtube URL" name="youtube"/>
                </div>
                <div className={classes.social_media}>
                    <i className="fab fa-linkedin-in fa-2x"></i>
                    <input onChange={e => updateState(e)} value={formState.linkedin} type="text" placeholder="Linkedin URL" name="linkedin"/>
                </div>
                <div className={classes.social_media}>
                    <i className="fab fa-instagram fa-2x"></i>
                    <input onChange={e => updateState(e)} value={formState.instegram} type="text" placeholder="Instegram URL" name="instegram"/>
                </div>
        </Fragment>
    }

    return (
        <section className={classes.create_profile_container}>
            <h1>Create Your Profile:</h1>
            <p>Let's get some information to make your profile stand out</p>
            <small>* Required Fields</small>
            <Alert />
            <form onSubmit={(e) => save(e)}>
                <div className={classes.status_select}>
                  <select onChange={e => updateState(e)} value={formState.status} className={classes.select_css} name="status">
                      <option value="0">* Select Professional Status</option>
                      <option value="student">Student</option>
                      <option value="intern">Intern</option>
                      <option value="junior lawyer">Junior Lawyer</option>
                      <option value="senior lawyer">Senior Lawyer</option>
                      <option value="manager">Manager</option>
                      <option value="other">Other</option>
                  </select>
                  <small>Give us an idea of where you are at in your career</small>
                </div>
                <div className={classes.input_field}>
                  <input onChange={e => updateState(e)} value={formState.company} type="text" placeholder="Company" name="company"/>
                  <small>Could be your own company or one your work for</small>
                </div>
                <div className={classes.input_field}>
                    <input onChange={e => updateState(e)} value={formState.website} type="text" placeholder="Website" name="website"/>
                    <small>Could be your own or a company website</small>
                </div>
                <div className={classes.input_field}>
                    <input onChange={e => updateState(e)} value={formState.location} type="text" placeholder="Location" name="location"/>
                    <small>City and state suggested</small>
                </div>
                <div className={classes.input_field}>
                    <input onChange={e => updateState(e)} value={formState.skills} type="text" placeholder="* Skills" name="skills"/>
                    <small>Please use comma seperated values</small>
                </div>
                <div>
                    <textarea onChange={e => updateState(e)} value={formState.bio} placeholder="Tell us about yourself..." name="bio"></textarea>
                    <small>Feel free to fill any content</small>
                </div>
                <div>
                    <button onClick={openSocialTags} type="button" className={classes.social_btn}>Add Social Network Links</button>
                    <span>Optional</span>
                </div>
                {socialInputs}
                <div>
                    <button type="submit" className={classes.social_btn}>Submit</button>
                    <button onClick={backHandler} className={classes.social_btn}>Back</button>
                </div>
            </form>
        </section>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendData: (data, history) => dispatch(profileAction.createProfile(data, history))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(CreateProfile));