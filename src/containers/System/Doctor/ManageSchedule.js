import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import Select from "react-select";
import './ManageSchedule.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            listDoctors: [],
            currentDate: '',
            listSchedules: [],
            currentUserId: this.props.user.id,
            isAdmin: this.props.user.roleId === 'R1' ? true : false
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllSchedulesRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.allSchedulesRedux !== this.props.allSchedulesRedux) {
            let times = this.props.allSchedulesRedux;
            if (times && times.length > 0) {
                times = times.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                listSchedules: times,
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let language = this.props.language;
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;

                result.push(object);
            });
        }
        return result;
    }

    handleChangeSelect = (selectedDoctor) => {
        this.setState({
            selectedDoctor: selectedDoctor,
        });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { listSchedules } = this.state;
        if (listSchedules && listSchedules.length > 0) {
            listSchedules = listSchedules.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })

            this.setState({
                listSchedules: listSchedules
            })
        }
    }

    handleSaveSchedule = async () => {
        let { currentDate, selectedDoctor, listSchedules } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date");
            return;
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor");
            return;
        }

        let formattedDate = new Date(currentDate).getTime();

        if (listSchedules && listSchedules.length > 0) {
            let selectedSchedules = listSchedules.filter(item => item.isSelected === true);
            if (selectedSchedules && selectedSchedules.length > 0) {
                selectedSchedules.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = item.keyMap;

                    result.push(object);
                })
            } else {
                toast.error("Invalid selected time");
            }
        }

        let res = await saveBulkScheduleDoctor({
            arraySchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        });

        if (res.errorCode === 0) {
            toast.success('Save schedule successfully');
        } else {
            toast.error("Existing schedule in system");
        }

    }

    render() {
        const { language } = this.props;
        let { listSchedules, currentUserId, isAdmin, listDoctors } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-title"><FormattedMessage id="manage-schedule.title" /></div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-doctor" />:</label>
                            <Select
                                value={isAdmin === true ? this.state.selectedDoctor : listDoctors.find(item => {
                                    return item && item.value === currentUserId;
                                })}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                isDisabled={isAdmin === true ? false : true}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" />:</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {listSchedules && listSchedules.length > 0 &&
                                listSchedules.map((item, index) => {
                                    return (
                                        <button key={index}
                                            className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    );
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button onClick={() => this.handleSaveSchedule()} className="btn btn-primary btn-save-schedule"><FormattedMessage id="manage-schedule.save" /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo,
        allDoctorsRedux: state.admin.allDoctors,
        allSchedulesRedux: state.admin.allSchedules
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
        fetchAllSchedulesRedux: () => dispatch(actions.fetchAllSchedulesStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
