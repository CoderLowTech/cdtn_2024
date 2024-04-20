import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';



class HomeFooter extends Component {


    render() {
        return (
            <div className="footer-container">
                <div className="footer-content-left">
                    <h3>Nguyễn Hoàng Tùng</h3>
                    <p><FormattedMessage id="footer.address" />: Số 2 Nguyễn Đình Chiểu, Nha Trang</p>
                    <p><FormattedMessage id="footer.contact" />: tung.nh.62cntt@ntu.edu.vn</p>
                </div>
                <div className="footer-content-right">
                    <p>&copy; 2024 Nguyễn Hoàng Tùng. All rights reserved.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
