import React from 'react';
import { Link } from 'react-router-dom';
import classes from './profileItem.module.css';

const ProfileItem = props => {
    const skills = props.skills.split(',');
    const listOfSkills = skills.map((skill, index) => {
        return <p key={index}><i className="fas fa-check-circle fa-lg"></i>{skill}</p>
    })
    

    return (
        <section className={classes.grid}>
            <div>
                <img className={classes.image} src={props.avatar} alt="avatar"/>
            </div>
            <div>
                <h2>{props.name}</h2>
                <p>{props.status}</p>
                <p>{props.company}</p>
                <Link to={`/userId/${props.id}`} className={classes.btn}>View Profile</Link>
            </div>
            <div>
                {listOfSkills}
            </div>
        </section>
    )
}

export default ProfileItem;