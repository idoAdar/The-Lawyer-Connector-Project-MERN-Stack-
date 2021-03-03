import React from 'react';
import { connect } from 'react-redux';
import * as profileAction from '../../../store/actions/profileActionTypes';
import classes from './DashEducation.module.css';

const DashEducation = props => {
    const educations = props.profile.education.map(edu => {
        return <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.from} - {edu.to ? edu.to : 'Current'}</td>
            <td><button onClick={() => props.deleteEdu(edu._id)}><i className="fas fa-backspace fa-2x"></i></button></td>
        </tr>
    })

    return (
        <section>
          <h1>Education</h1>
          <table className={classes.education_container}>
              <thead>
                  <tr>
                      <th>School</th>
                      <th>Degree</th>
                      <th>Years</th>
                  </tr>
              </thead>
              <tbody>
                  {educations}
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
        deleteEdu: (id) => dispatch(profileAction.deleteEducation(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashEducation);