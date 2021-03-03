import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as profileAction from '../../store/actions/profileActionTypes';
import { withRouter } from 'react-router-dom';
import Alert from '../AlertMechanism/alert';
import classes from './Education.module.css';

const Education = props => {
    const [currentState, setCurrentState] = useState(false);
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
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

    const addEducation = e => {
        e.preventDefault();
        props.sendData(formData, props.history);
    }

    const backHandler = () => {
        props.history.push('/dashboard');
    }

    return (
        <section className={classes.education_container}>
            <h1>Add Your Education:</h1>
            <p>Add any institute or proffectional school that you have attended</p>
            <small>* Required Fields</small>
            <Alert />
            <form onSubmit={addEducation}>
                <div className={classes.input_field}>
                    <input type="text" onChange={(e) => updateState(e)} value={formData.school} placeholder="Institue" name="school"/>
                </div>
                <div className={classes.input_field}>
                    <input type="text" onChange={(e) => updateState(e)} value={formData.degree} placeholder="Degree or Certificate" name="degree"/>
                </div>
                <div className={classes.input_field}>
                    <input type="date" onChange={(e) => updateState(e)} value={formData.from} name="from"/>
                </div>
                <div className={classes.input_field}>
                    <input type="date" onChange={(e) => updateState(e)} value={formData.to} disabled={currentState ? 'disabled' : null} name="to"/>
                </div>
                <div>
                    <input type="checkbox" onChange={() => { setFormData({ ...formData, current: !formData.current }); setCurrentState(!currentState) }} name="current"/>
                    <label> Current School:</label>
                </div>
                <div>
                    <textarea placeholder="Description..." name="description"></textarea>
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
        sendData: (data, history) => dispatch(profileAction.addEducation(data, history))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Education));