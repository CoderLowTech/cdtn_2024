import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './ConfirmModal.scss';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import localization from 'moment/locale/vi';


class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleSendReceipt = () => {
        this.props.sendReceipt(this.state);
    }

    render() {
        let { isOpenModal, closeConfirmModal } = this.props;
        let { email } = this.state;
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="md"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title"><FormattedMessage id="confirm-modal.title" /></h5>
                    <button onClick={closeConfirmModal} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <div >
                                <label><FormattedMessage id="confirm-modal.email" />:</label>
                                <input className="form-control" type="email" value={email}
                                    onChange={(event) => this.handleOnChangeEmail(event)} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendReceipt()}><FormattedMessage id="confirm-modal.send" /></Button>{' '}
                    <Button color="secondary" onClick={closeConfirmModal}><FormattedMessage id="confirm-modal.cancel" /></Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
