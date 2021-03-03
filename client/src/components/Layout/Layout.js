import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from '../../store/actions/authActionTypes';
import { Fragment } from 'react';
import PrivateRoute from '../../utills/privateRoute';
import Navbar from '../Navbar/navbar';
import Landing from '../Landing/landing';
import Auth from '../Auth & Log/auth';
import Login from '../Auth & Log/login';
import Dashboard from '../Dashboard/dashboard';
import CreateProfile from '../Profile/CreateProfile/createProfile';
import EditProfile from '../Profile/EditProfile/EditProfile';
import Experience from '../Experience/Experience';
import Education from '../Education/Education';
import ProfilesMain from '../Profiles/Main/Main';
import ProfileById from '../Profiles/ProfileById/ProfileById';
import Posts from '../Posts/Posts/Posts';
import Post from '../Posts/Post/Post';

import setAuthToken from '../../utills/setAuthToken';
if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const Layout = props => {
    useEffect(() => {
        props.authStart();
    }, [])

    return (
        <Fragment>
            <Navbar />
            <main>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/register" component={Auth} />
                    <Route path="/login" component={Login} />
                    <Route path="/profiles" component={ProfilesMain} />
                    <Route path="/userId/:id" component={ProfileById} />
                    <PrivateRoute path="/dashboard" component={Dashboard} isAuth={props.isAuth}/>
                    <PrivateRoute path="/create-profile" component={CreateProfile} isAuth={props.isAuth}/>
                    <PrivateRoute path="/edit-profile" component={EditProfile} isAuth={props.isAuth}/>
                    <PrivateRoute path="/add-experience" component={Experience} isAuth={props.isAuth}/>
                    <PrivateRoute path="/add-education" component={Education} isAuth={props.isAuth}/>
                    <PrivateRoute path="/posts/:id" component={Post} isAuth={props.isAuth}/>
                    <PrivateRoute path="/posts" component={Posts} isAuth={props.isAuth}/>
                </Switch>
            </main>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.registerReducer.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authStart: () => dispatch(authAction.loadUSer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);