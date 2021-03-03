import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './landing.module.css';

const landing = props => {
    const mainBtns = (
            <div className={classes.btns}>
              <Link to={"/register"} className={classes.btn}>Sign Up</Link>
              <Link to={"/login"} className={classes.btn}>Login</Link>
            </div>
    )

    return (
    <section className={classes.landing}>
      <div className={classes.inner}>
          <div>
              <h1>Lawyer Connector</h1>
              <p>Create lawyer profile, share posts and get help from other lawyers</p>
          </div>
            {!props.isAuth ? mainBtns : null}
      </div>
  </section>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.registerReducer.isAuthenticated
    }
}

export default connect(mapStateToProps)(landing);