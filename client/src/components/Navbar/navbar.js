import React from 'react';
import { connect } from 'react-redux';
import * as authAction from '../../store/actions/authActionTypes';
import { NavLink } from 'react-router-dom';
import classes from './navbar.module.css';

const navbar = props => {
    const publicLinks = (
        <ul className={classes.a_container}>
            <li>
                <NavLink to={"/profiles"} activeClassName={classes.active}>Lawyers</NavLink>
            </li>
            <li>
                <NavLink to={"/register"} activeClassName={classes.active}>Register</NavLink>
            </li>
            <li>
                <NavLink to={"/login"} activeClassName={classes.active}>Login</NavLink>
            </li>
        </ul>
    );

    const loginLinks = (
        <ul className={classes.a_container}>
            <li>
                <NavLink to={"/profiles"} activeClassName={classes.active}>Lawyers</NavLink>
            </li>
            <li>
                <NavLink to={"/posts"} activeClassName={classes.active}>Posts</NavLink>
            </li>
            <li>
                <NavLink to={"/dashboard"} activeClassName={classes.active}>
                <i className="fas fa-user"></i>{' '}Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to={"/"} onClick={props.logout}>
                <i className="fas fa-sign-out-alt"></i>{' '}Logout
                </NavLink>
            </li>
        </ul>
    );

    return (
    <nav className={classes.navbar}>
        <h1 className={classes.a_container}>
            <NavLink to={"/"} exact activeClassName={classes.active}><i className="fab fa-atlassian fa-2x"></i> LawConnector</NavLink>
        </h1>
        {props.isAuth ? loginLinks : publicLinks}
    </nav>    
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.registerReducer.isAuthenticated,
        isLoading: state.registerReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authAction.logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar);