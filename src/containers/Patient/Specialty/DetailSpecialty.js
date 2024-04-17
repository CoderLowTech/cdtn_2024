import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllcodeService, getAllSpecialty } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';


class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            listSpecialty: [],
            selectedProvince: 'ALL',
            selectedSpecialty: 'ALL',
            isShowDescription: true
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            if (id === 'ALL') {
                this.setState({
                    isShowDescription: false
                })
            }
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            let resProvince = await getAllcodeService('PROVINCE');
            if (res && res.errorCode === 0 && resProvince && resProvince.errorCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'All',
                        valueVi: 'Toàn quốc'
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
            let resSpecialty = await getAllSpecialty();
            let dataSpecialty = resSpecialty.data;
            if (dataSpecialty && dataSpecialty.length > 0) {
                dataSpecialty.unshift({
                    createdAt: null,
                    id: 'ALL',
                    name: 'Tất cả',
                })
            }

            this.setState({
                listSpecialty: dataSpecialty ? dataSpecialty : []
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevState.selectedProvince !== this.state.selectedProvince) {
            let res = await getDetailSpecialtyById({
                id: this.state.selectedSpecialty,
                location: this.state.selectedProvince
            });
            if (res && res.errorCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
        if (prevState.selectedSpecialty !== this.state.selectedSpecialty) {
            let res = await getDetailSpecialtyById({
                id: this.state.selectedSpecialty,
                location: this.state.selectedProvince
            });
            if (res && res.errorCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    handleFilterDoctorByLocation = async (event) => {

        let { isShowDescription } = this.state;
        if (isShowDescription === true) {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id;
                let location = event.target.value;
                let res = await getDetailSpecialtyById({
                    id: id,
                    location: location
                });
                if (res && res.errorCode === 0) {
                    let data = res.data;
                    let arrDoctorId = [];
                    if (data && !_.isEmpty(data)) {
                        let arr = data.doctorSpecialty;
                        if (arr && arr.length > 0) {
                            arr.map((item) => {
                                arrDoctorId.push(item.doctorId)
                            })
                        }
                    }
                    this.setState({
                        dataDetailSpecialty: res.data,
                        arrDoctorId: arrDoctorId,
                    })
                }
            }
        } else {
            this.setState({
                selectedProvince: event.target.value
            })
        }
    }

    handleFilterDoctorBySpecialty = async (event) => {
        this.setState({
            selectedSpecialty: event.target.value
        })
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince, listSpecialty, isShowDescription } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty-container" >
                <HomeHeader />
                <div className="detail-specialty-body">
                    {isShowDescription === true &&
                        <div className="description-specialty">
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>

                                </div>
                            }
                        </div>
                    }

                    <div className="filter-doctor">
                        <div className="filter-doctor-by-location">
                            <select onChange={(event) => this.handleFilterDoctorByLocation(event)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === LANGUAGES.VI ? `${item.valueVi}` : `${item.valueEn}`}
                                            </option>
                                        )
                                    })

                                }
                            </select>
                        </div>
                        {isShowDescription === false &&
                            <div className="filter-doctor-by-specialty">
                                <select onChange={(event) => this.handleFilterDoctorBySpecialty(event)}>
                                    {listSpecialty && listSpecialty.length > 0 &&
                                        listSpecialty.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        })

                                    }
                                </select>
                            </div>
                        }
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0
                        ?
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="detail-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="detail-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorIdFromParent={item} />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : <div className="no-doctor"><FormattedMessage id="patient.detail-specialty.no-doctor" /></div>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
