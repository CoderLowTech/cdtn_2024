import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


class OutStandingDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            doctorArr: []
        }

    }

    componentDidMount() {
        this.props.fetchTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                doctorArr: this.props.topDoctorsRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    render() {
        let topDoctors = this.state.doctorArr;
        let { language } = this.props;
        // topDoctors = topDoctors.concat(topDoctors).concat(topDoctors);
        return (
            <div className="section-share outstanding-doctor-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="home-page.outstanding-doctor" /></span>
                        <button className="btn-section"><Link to={`/detail-specialty/ALL`}><FormattedMessage id="home-page.more-info" /></Link></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {topDoctors && topDoctors.length > 0 && topDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div className="bg-image outstanding-doctor-section" alt="outstanding-doctor-img"
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                ></div>
                                            </div>
                                            <div className="position text-center">
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div><FormattedMessage id="home-page.doctor-specialty" />:{item.Doctor_Infor.specialtyTypeData.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctors: () => dispatch(actions.fetchTopDoctorsStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
