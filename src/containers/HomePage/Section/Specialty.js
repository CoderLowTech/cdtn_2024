import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';


class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errorCode === 0) {
            this.setState({
                listSpecialty: res.data ? res.data : []
            });
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }

    render() {
        let { listSpecialty } = this.state;
        return (
            <div className="section-share specialty-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="home-page.specialty" /></span>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {listSpecialty && listSpecialty.length > 0 &&
                                listSpecialty.map((item, index) => {
                                    return (
                                        <div className="section-customize" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className="bg-image specialty-section" alt="specialty-img"
                                                style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div>{item.name}</div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
