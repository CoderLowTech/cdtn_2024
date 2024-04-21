import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import Select from "react-select";
import './ManageBooking.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getListBookings, sendReceipt } from '../../../services/userService';
import ConfirmModal from './Modal/ConfirmModal';
import LoadingOverlay from 'react-loading-overlay';

class ManageBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            patientData: [],
            isOpenConfirmModal: false,
            dataModal: {},
            isShowLoading: false
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

        let res = await getListBookings({
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


    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            doctorFirstName: item.bookingDoctorData.User.firstName,
            doctorLastName: item.bookingDoctorData.User.lastName,
            price: item.bookingDoctorData.priceTypeData,
            time: item.timeData,
            date: item.date
        }
        this.setState({
            isOpenConfirmModal: true,
            dataModal: data
        })
    }

    closeConfirmModal = () => {
        this.setState({
            isOpenConfirmModal: false,
            dataModal: {}
        })
    }

    sendReceipt = async (dataFromChild) => {
        this.setState({
            isShowLoading: true
        })

        let { dataModal } = this.state;
        let res = await sendReceipt({
            email: dataFromChild.email,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
            doctorFirstName: dataModal.doctorFirstName,
            doctorLastName: dataModal.doctorLastName,
            price: dataModal.price,
            time: dataModal.time,
            date: dataModal.date
        });
        if (res && res.errorCode === 0) {
            this.setState({
                isOpenConfirmModal: false,
                isShowLoading: false
            })
            toast.success(res.errorMessage);
            await this.getPatientData();
        } else {
            toast.error('Updated status booking failed');
        }
    }

    render() {
        const { language } = this.props;
        let { patientData, isOpenConfirmModal, dataModal, isShowLoading } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <LoadingOverlay
                    active={isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className="manage-booking-container">
                        <div className="manage-booking-title">
                            <FormattedMessage id="manage-booking.title" />
                        </div>
                        <div className="manage-booking-body row">
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="manage-booking.date" />:</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className="col-12 table-manage-booking">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th><FormattedMessage id="table.time" /></th>
                                            <th><FormattedMessage id="table.fullName" /></th>
                                            <th><FormattedMessage id="table.gender" /></th>
                                            <th><FormattedMessage id="table.address" /></th>
                                            <th><FormattedMessage id="table.phoneNumber" /></th>
                                            <th></th>
                                        </tr>
                                        {patientData && patientData.length > 0
                                            ?
                                            patientData.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ? item.timeData.valueVi : item.timeData.valueEn;
                                                let genderDisplay = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{timeDisplay}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{genderDisplay}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.patientData.phoneNumber}</td>
                                                        <td>
                                                            <button className="manage-booking-btn-confirm"
                                                                onClick={() => this.handleConfirm(item)}>
                                                                <FormattedMessage id="table.confirm" />
                                                            </button>
                                                        </td>
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
                    <ConfirmModal
                        isOpenModal={isOpenConfirmModal}
                        closeConfirmModal={this.closeConfirmModal}
                        dataModal={dataModal}
                        sendReceipt={this.sendReceipt}
                    />
                </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
