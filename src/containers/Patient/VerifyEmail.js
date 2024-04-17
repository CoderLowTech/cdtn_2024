import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'


class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errorCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errorCode === 0) {
                this.setState({
                    statusVerify: true,
                    errorCode: res.errorCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errorCode: res && res.errorCode ? res.errorCode : -1
                })
            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {
        let { statusVerify, errorCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false
                        ?
                        <div className="infor-booking"><FormattedMessage id="patient.verify-booking-appointment.loading" /></div>
                        :
                        <div>
                            {errorCode === 0
                                ?
                                <div className="infor-booking"><FormattedMessage id="patient.verify-booking-appointment.success" /></div>
                                :
                                <div className="infor-booking"><FormattedMessage id="patient.verify-booking-appointment.error" /></div>
                            }
                        </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
