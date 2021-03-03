import React from 'react';
import { connect } from 'react-redux';
import classes from './ProfileSkillsAndBio.module.css';

const ProfileSkillsAndBio = props => {    
    return (
        <section className={classes.bio_skills_container}>
            <div className={classes.skills}>
                <h3><i className="fas fa-check-double"></i> Skills</h3>
                <p>{props.repository.skills.replace(/,/g, '')}</p>
            </div>
            {props.repository.bio ? (
            <div className={classes.bio}>
                <h3><i className="fas fa-address-card"></i> Bio</h3>
                <p>{props.repository.bio}</p>
            </div>
            ) : ('')}
      </section>
    )
}

const mapStateToProps = state => {
    return {
        repository: state.profileReducer.repository
    }
}

export default connect(mapStateToProps, null)(ProfileSkillsAndBio);