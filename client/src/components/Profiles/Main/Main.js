import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as profileAction from '../../../store/actions/profileActionTypes';
import ProfileItem from '../ProfileItem/profileItem';
import Spinner from '../../Spinner/spinner';
import classes from './Main.module.css';

const Main = props => {
    useEffect(() => {
        props.getProfiles();
    }, [])

    return (
        <Fragment>
            {props.isLoading ? <Spinner /> : <Fragment>
                <div className={classes.main}>
                    <h1>Lawyers</h1>
                    <p>
                        Connect with other lawyers all over the world
                        and share knowledge with your co-workers...
                    </p>
                </div>
                {props.profiles.map(profile => {
                    return (
                        <div key={profile._id} className={classes.profile}>
                            <ProfileItem 
                                avatar={profile.user.avatar} 
                                name={profile.user.name} 
                                status={profile.status} 
                                company={profile.company} 
                                skills={profile.skills}
                                id={profile.user._id}/>
                        </div>
                    )
                })}
                </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        profiles: state.profileReducer.profiles,
        isLoading: state.profileReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfiles: () => dispatch(profileAction.getAllProfiles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);