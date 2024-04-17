import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class About extends Component {

    
    render() {
        

        return (
            <div className="section-share about-section">
                <div className="about-header-section">
                    Truyền thông nói gì về chúng tôi
                </div>
                <div className="about-content-section">
                    <div className="content-left">
                    <iframe width="60%" height="400px" 
                            src="https://www.youtube.com/embed/FyDQljKtWnI" 
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                    </iframe>
                    </div>
                    <div className="content-right"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
