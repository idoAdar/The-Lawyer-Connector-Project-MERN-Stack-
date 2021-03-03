import React, { useState } from 'react';
import { connect } from 'react-redux';
import addAlert from '../../store/actions/alertActionTypes';
import * as authAction from '../../store/actions/authActionTypes';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../AlertMechanism/alert';
import Spinner from '../Spinner/spinner';
import classes from './authAndLog.module.css';

const Auth = (props) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {name, email, password, confirmPassword} = formState;

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const sendData = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            const data = {msg: 'Password do not match', param: Math.random(), type: 'red'};
            props.setAlert(data);
        } else {
            props.loader();
            props.register(name, email, password);
        }
    }

    if (props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <section className={classes.container}>
            <Alert />
            <div className={classes.text_primary}>
                <h1>Sign Up</h1>
                <p><i className="fas fa-user fa-2x"></i> Create Your Account</p>
            </div>
            <form onSubmit={(e) => sendData(e)} className={classes.form}>
                <div>
                    <input type="text" onChange={(e) => updateState(e)} value={formState.name} placeholder="Name" name="name"/>
                </div>
                <div>
                    <input type="email" onChange={(e) => updateState(e)} value={formState.email} placeholder="Email Address" name="email"/>
                </div>
                <div>
                    <input type="password" onChange={(e) => updateState(e)} value={formState.password} minLength="6" placeholder="Password" name="password"/>
                </div>
                <div>
                    <input type="password" onChange={(e) => updateState(e)} value={formState.confirmPassword} minLength="6" placeholder="Confirm Password" name="confirmPassword"/>
                </div>
                <input type="submit" className={classes.btn}/>
            </form>
            <p>Alredy have account? <Link to="/login" style={{color: '#2dc1d8'}}>Login</Link></p>
            {props.isLoading ? <Spinner /> : null}
    </section>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.registerReducer.isAuthenticated,
        isLoading: state.registerReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAlert: (msg) => dispatch(addAlert(msg)),
        register: (name, email, password) => dispatch(authAction.register(name, email, password)),
        loader: () => dispatch(authAction.spinnerHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);