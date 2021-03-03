import React from 'react';
import { Link } from 'react-router-dom';
import classes from './dashboardControl.module.css';

const dashboardControle = () => {
    return (
        <section>
          <div className={classes.dashboard_btns}>
              <div>
                <Link to="/edit-profile" className={classes.dash_link}><i className="fas fa-user-plus"></i> Edit Profile</Link>
              </div>
              <div>
                <Link to="/add-experience" className={classes.dash_link}><i className="fas fa-network-wired"></i> Add Experience</Link>
            </div>
            <div>
                <Link to="/add-education" className={classes.dash_link}><i className="fas fa-graduation-cap"></i> Add Education</Link>
            </div>
          </div>
      </section>
    )
}

export default dashboardControle;