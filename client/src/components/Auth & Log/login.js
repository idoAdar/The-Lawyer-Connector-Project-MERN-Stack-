import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as authAction from '../../store/actions/authActionTypes';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../AlertMechanism/alert';
import Spinner from '../Spinner/spinner';
import classes from './authAndLog.module.css';

const Login = props => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formState;

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const sendData = e => {
        e.preventDefault();
        props.loader();
        props.login(email, password);
    }

    if (props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <section className={classes.container}>
            <Alert />
            <div className={classes.text_primary}>
                <h1>Welcome Back</h1>
                <p><i className="fas fa-user fa-2x"></i> Sign into your account</p>
            </div>
            <form onSubmit={(e) => sendData(e)} className={classes.form}>
            <div>
                <input type="email" onChange={(e) => updateState(e)} value={formState.email} name="email" placeholder="Email Address"/>
            </div>
            <div>
                <input type="password" onChange={(e) => updateState(e)} value={formState.password} name="password" minLength="6" placeholder="Password"/>
            </div>
            <input type="submit" className={classes.btn}/>
            </form>
            <p>Don't have a count yet? <Link to="/register" style={{color: '#2dc1d8'}}>Sgin Up</Link></p>
            {props.isLoading ? <Spinner /> : null}
    </section>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.registerReducer.isAuthenticated,
        isLoading: state.registerReducer.isLoading,
        token: state.registerReducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(authAction.loginUser(email, password)),
        loader: () => dispatch(authAction.spinnerHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);