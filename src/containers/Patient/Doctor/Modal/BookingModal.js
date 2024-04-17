import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import localization from 'moment/locale/vi';
import LoadingOverlay from 'react-loading-overlay';


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            date: '',
            selectedGender: '',
            doctorId: '',
            listGender: '',
            timeType: '',
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                listGender: this.buildDataGender(this.props.gendersRedux)
            })
        }
        if (prevProps.gendersRedux !== this.props.gendersRedux) {
            this.setState({
                listGender: this.buildDataGender(this.props.gendersRedux)
            })
        }
        if (prevProps.timeData !== this.props.timeData) {
            if (this.props.timeData && !_.isEmpty(this.props.timeData)) {
                let doctorId = this.props.timeData.doctorId;
                let timeType = this.props.timeData.timeType;
                let date = this.props.timeData.date
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    date: date
                })
            }
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;

                result.push(object);
            })
            return result;
        }
    }

    buildTimeBooking = (timeData) => {
        let { language } = this.props;
        if (timeData && !_.isEmpty(timeData)) {
            let time = language === LANGUAGES.VI
                ? timeData.timeTypeData.valueVi
                : timeData.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI
                ? moment.unix(+timeData.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+timeData.date / 1000).locale('en').format('ddd - MM/DD/YYYY');

            return `${time} - ${date}`;
        }
        return ``;
    }

    buildDoctorName = (timeData) => {
        let { language } = this.props;
        if (timeData && !_.isEmpty(timeData)) {
            let name = language === LANGUAGES.VI
                ? `${timeData.doctorData.lastName} ${timeData.doctorData.firstName}`
                : `${timeData.doctorData.firstName} ${timeData.doctorData.lastName}`

            return name
        }
        return ``;
    }


    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    }

    handleOnChangeSelect = (selectedGender) => {
        this.setState({ selectedGender: selectedGender })
    }

    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true
        })
        let timeString = this.buildTimeBooking(this.props.timeData);
        let doctorName = this.buildDoctorName(this.props.timeData)
        let res = await postBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            date: this.state.date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        })
        if (res && res.errorCode === 0) {
            toast.success('Booking a new appointment successfully')
            this.setState({
                isShowLoading: false
            })
            this.props.closeBookingModal()
        } else {
            this.setState({
                isShowLoading: false
            })
            this.props.closeBookingModal()
            toast.error('Booking a new appointment failed')
        }
    }

    render() {
        let { isOpenModal, closeBookingModal, timeData } = this.props;
        let { isShowLoading } = this.state;
        let doctorId = '';
        if (timeData && !_.isEmpty(timeData)) {
            doctorId = timeData.doctorId
        }
        return (
            <>
                <LoadingOverlay
                    active={isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <Modal
                        isOpen={isOpenModal}
                        className={'booking-modal-container'}
                        size="lg"
                        centered
                    >
                        <div className="booking-modal-content">
                            <div className="booking-modal-header">
                                <span className="left"><FormattedMessage id="patient.booking-modal.title" /></span>
                                <span
                                    className="right"
                                    onClick={closeBookingModal}
                                ><i className="fas fa-times"></i></span>
                            </div>
                            <div className="booking-modal-body">
                                <div className="doctor-infor">
                                    <ProfileDoctor doctorId={doctorId} isShowDescription={false} timeData={timeData} isShowLinkDetail={false} isShowPrice={true} />
                                </div>
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.fullName" />:</label>
                                        <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.phoneNumber" />:</label>
                                        <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.email" />:</label>
                                        <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.address" />:</label>
                                        <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.gender" />:</label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleOnChangeSelect}
                                            options={this.state.listGender}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="booking-modal-footer">
                                <button className="btn-booking-confirm"
                                    onClick={() => this.handleConfirmBooking()}
                                ><FormattedMessage id="patient.booking-modal.btnConfirm" /></button>
                                <button className="btn-booking-cancel"
                                    onClick={closeBookingModal}
                                ><FormattedMessage id="patient.booking-modal.btnCancel" /></button>
                            </div>
                        </div>
                    </Modal>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gendersRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
