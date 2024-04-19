import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import Select from "react-select";
import './AppointmentHistory.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import moment from 'moment';
import _ from 'lodash';
import { getHistoryBookings } from '../../../services/userService';

class AppointmentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            patientData: [],
        }
    }

    async componentDidMount() {

        this.getPatientData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }

    getPatientData = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formattedDate = new Date(currentDate).getTime();

        let res = await getHistoryBookings({
            doctorId: user.id,
            date: formattedDate
        });
        if (res && res.errorCode === 0) {
            this.setState({
                patientData: res.data
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getPatientData();
        })
    }

    render() {
        const { language } = this.props;
        let { patientData } = this.state;
        console.log('check currentDate: ', this.state.currentDate);
        return (
            <>

                <div className="history-container">
                    <div className="history-title">
                        <FormattedMessage id="history.title" />
                    </div>
                    <div className="history-body row">
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="history.date" />:</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className="col-12 table-history">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th><FormattedMessage id="table.time" /></th>
                                        <th><FormattedMessage id="table.fullName" /></th>
                                        <th><FormattedMessage id="table.gender" /></th>
                                        <th><FormattedMessage id="table.address" /></th>
                                        <th><FormattedMessage id="table.phoneNumber" /></th>
                                        <th><FormattedMessage id="table.status" /></th>
                                    </tr>
                                    {patientData && patientData.length > 0
                                        ?
                                        patientData.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeData.valueVi : item.timeData.valueEn;
                                            let genderDisplay = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                            let statusDisplay = language === LANGUAGES.VI ? item.statusData.valueVi : item.statusData.valueEn;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{timeDisplay}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{genderDisplay}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.patientData.phoneNumber}</td>
                                                    <td>{statusDisplay}</td>
                                                </tr>
                                            );
                                        })
                                        :
                                        <tr><td colSpan="7" style={{ textAlign: "center" }}><FormattedMessage id="table.no-data" /></td></tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentHistory);
