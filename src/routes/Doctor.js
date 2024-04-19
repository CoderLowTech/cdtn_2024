import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManageBooking from '../containers/System/Doctor/ManageBooking';
import AppointmentHistory from '../containers/System/Doctor/AppointmentHistory';

class Doctor extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}

                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-booking" component={ManageBooking} />
                            <Route path="/doctor/history" component={AppointmentHistory} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
