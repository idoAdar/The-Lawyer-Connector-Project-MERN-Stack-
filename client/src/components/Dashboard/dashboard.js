import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as profileAction from '../../store/actions/profileActionTypes';
import DashboardControle from './dashboardControl/dashboardControl';
import DashExperience from './DashExperience/DashExperience';
import DashEducation from './DashEducation/DashEducation';
import Alert from '../AlertMechanism/alert';
import classes from './dashboard.module.css';

const Dashboard = props => {
    useEffect(() => {
        return props.getMyProfile();
    }, [])

    return (
        <Fragment>
            <div className={classes.main}>
                <Alert />
                <h1>Dashboard</h1>
                <p><i className="fas fa-user"></i> Welcome {props.user.name}</p>
            </div>
            {props.profile && !props.isLoading ? (
                <div className={classes.container}>
                    <DashboardControle />
                    <DashExperience />
                    <DashEducation />
                </div>
                )
                : (
                <div className={classes.controller_container}>
                    <p>You have not set your profile yet, please add some info about yourself</p>
                    <Link to="/create-profile" className={classes.create_profile_btn}>Create Profile</Link>
                </div>
                )
            }
            <div className={classes.remove_account_container}>
                <button onClick={() => props.remove(props.history)}>REMOVE ACCOUNT</button>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer.profile,
        isLoading: state.profileReducer.isLoading,
        user: state.registerReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMyProfile: () => dispatch(profileAction.getProfileMe()),
        remove: (history) => dispatch(profileAction.removeAccount(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));