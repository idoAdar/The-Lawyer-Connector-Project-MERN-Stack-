import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as profileAction from '../../store/actions/profileActionTypes';
import Alert from '../AlertMechanism/alert';
import classes from './Experience.module.css';

const Experience = props => {
    const [currentState, setCurrentState] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const updateState = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const addExperience = e => {
        e.preventDefault();
        props.sendData(formData, props.history);
    }

    const backHandler = () => {
        props.history.push('/dashboard');
    }

    return (
        <section className={classes.experience_container}>
            <h1>Add An Experience:</h1>
            <p>Add any position that you have had during your carrer</p>
            <small>* Required Fields</small>
            <Alert />
            <form onSubmit={(e) => addExperience(e)}>
                <div className={classes.input_field}>
                    <input type="text" onChange={(e) => updateState(e)} value={formData.title} placeholder="* Job Title" name="title"/>
                </div>
                <div className={classes.input_field}>
                    <input type="text" onChange={(e) => updateState(e)} value={formData.company} placeholder="* Company" name="company"/>
                </div>
                <div className={classes.input_field}>
                    <input type="text" onChange={(e) => updateState(e)} value={formData.location} placeholder="Location" name="location"/>
                    <small>City and state suggested</small>
                </div>
                <div className={classes.input_field}>
                    <input type="date" onChange={(e) => updateState(e)} value={formData.from} name="from"/>
                </div>
                <div className={classes.input_field}>
                    <input type="date" onChange={(e) => updateState(e)} value={formData.to} disabled={currentState ? 'disabled' : null}  name="to"/>
                </div>
                <div>
                    <input type="checkbox"
                    onChange={() => { setFormData({ ...formData, current: !formData.current }); setCurrentState(!currentState) }}
                    value={formData.current}
                    checked={formData.current} 
                    name="current"/>
                    <label> Current Job:</label>
                </div>
                <div>
                    <textarea onChange={(e) => updateState(e)} value={formData.description} placeholder="Description..." name="description"></textarea>
                    <small>Describe your position</small>
                </div>
                <div>
                    <button type="submit" className={classes.btn}>Submit</button>
                    <button onClick={backHandler} className={classes.btn}>Back</button>
                </div>
            </form>
        </section>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendData: (data, history) => dispatch(profileAction.addExperience(data, history))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Experience));