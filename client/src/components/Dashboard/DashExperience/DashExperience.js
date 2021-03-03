import React from 'react';
import { connect } from 'react-redux';
import * as profileAction from '../../../store/actions/profileActionTypes';
import classes from './DashExperience.module.css';

const DashExperience = props => {
    const experiences = props.profile.experience.map(exp => {
        return <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>{exp.from} - {exp.to ? exp.to : 'Current'}</td>
            <td><button onClick={() => props.deleteExp(exp._id)}><i className="fas fa-backspace fa-2x"></i></button></td>
        </tr>
    })

    return (
        <section>
          <h1>Experience</h1>
          <table className={classes.experience_container}>
              <thead>
                  <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Years</th>
                  </tr>
              </thead>
              <tbody>
                  {experiences}
              </tbody>
          </table>
      </section>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.profileReducer.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteExp: (id) => dispatch(profileAction.deleteExperience(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashExperience);