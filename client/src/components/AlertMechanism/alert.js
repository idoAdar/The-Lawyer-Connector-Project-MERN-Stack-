import React from 'react';
import { connect } from 'react-redux';
import './alert.css';

const Alert = props => {

    let alert = null;
    if (props.alerts.length > 0) {
        alert = <div>
                    {props.alerts.map(alert => {
                        let style = ['alert', 'red'].join(' ');
                        if (alert.data.type === 'green') {
                            style = ['alert', 'green'].join(' ');
                        }
                        if (alert.data.type === 'red') {
                            style = ['alert', 'red'].join(' ');
                        }
                        if (alert.data.type === 'gray') {
                            style = ['alert', 'gray'].join(' ');
                        }
                        return <p key={alert.data.param} className={style}>{alert.data.msg}</p>
                    })}
                </div>
    }
  
    return (
       <div>
           {alert}
       </div>
    )
}

const mapStateToProps = state => {
    return {
        alerts: state.alertReducer
    }
}

export default connect(mapStateToProps, null)(Alert);