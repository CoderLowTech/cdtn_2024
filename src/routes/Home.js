import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn, user } = this.props;
        let linkToRedirect = '';
        if (isLoggedIn) {
            if (user.roleId === 'R1') {
                linkToRedirect = '/system/manage-user';
            }
            if (user.roleId === 'R2') {
                linkToRedirect = '/doctor/manage-schedule';
            }
        } else {
            linkToRedirect = '/login';
        }

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
