import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllcodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_Actions, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import TableManageUser from './TableManageUser'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImageUrl: '',
            isOpen: false,
            action: '',
            userId: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
            positionId: '',
            image: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.getPositionStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gendersRedux !== this.props.gendersRedux) {
            let genderArray = this.props.gendersRedux
            this.setState({
                genderArr: genderArray,
                gender: genderArray && genderArray.length > 0 ? genderArray[0].keyMap : '',
            })
        }
        if (prevProps.rolesRedux !== this.props.rolesRedux) {
            let roleArray = this.props.rolesRedux
            this.setState({
                roleArr: roleArray,
                roleId: roleArray && roleArray.length > 0 ? roleArray[0].keyMap : ''
            })
        }
        if (prevProps.positionsRedux !== this.props.positionsRedux) {
            let positionArray = this.props.positionsRedux
            this.setState({
                positionArr: positionArray,
                positionId: positionArray && positionArray.length > 0 ? positionArray[0].keyMap : ''
            })
        }
        if (prevProps.usersRedux !== this.props.usersRedux) {
            let genderArray = this.props.gendersRedux;
            let roleArray = this.props.rolesRedux;
            let positionArray = this.props.positionsRedux;
            this.setState({
                action: CRUD_Actions.CREATE,
                userId: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: genderArray && genderArray.length > 0 ? genderArray[0].keyMap : '',
                roleId: roleArray && roleArray.length > 0 ? roleArray[0].keyMap : '',
                positionId: positionArray && positionArray.length > 0 ? positionArray[0].keyMap : '',
                image: '',
                previewImageUrl: ''
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let files = event.target.files;
        let file = files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                image: base64
            })
        }
    }

    openPreviewImage = () => {
        if (this.state.previewImageUrl) {
            this.setState({
                isOpen: true
            })
        } else {
            return;
        }

    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidInput() {
        let isValid = true;
        let arrayInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                isValid = false;
                alert('Missing required parametes: ' + arrayInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        let action = this.state.action;
        if (isValid === false) {
            return
        }
        //fire create new user action
        if (action === CRUD_Actions.CREATE) {
            this.props.createNewUserStart({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                positionId: this.state.positionId,
                image: this.state.image
            });
        }

        //fire edit user action
        if (action === CRUD_Actions.EDIT) {
            this.props.editUserStart({
                id: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                positionId: this.state.positionId,
                image: this.state.image
            })
        }
    }

    handleEditUser = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            action: CRUD_Actions.EDIT,
            userId: user.id,
            email: user.email,
            password: '******',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            roleId: user.roleId,
            positionId: user.positionId,
            image: imageBase64,
            previewImageUrl: imageBase64
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language
        let { email, password, firstName, lastName, address, phoneNumber, gender, roleId, positionId } = this.state;
        console.log('check image:', this.state.image);
        console.log('check preview image:', this.state.previewImageUrl);
        return (
            <div className="user-redux-container">
                <div className="title"><FormattedMessage id="manage-user.manage-title" /></div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" />: </label>
                                <input className="form-control" type="email" value={email} onChange={(event) => this.handleOnChangeInput(event, 'email')} disabled={this.state.action === CRUD_Actions.CREATE ? false : true} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" />: </label>
                                <input className="form-control" type="password" value={password} onChange={(event) => this.handleOnChangeInput(event, 'password')} disabled={this.state.action === CRUD_Actions.CREATE ? false : true} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name" />: </label>
                                <input className="form-control" type="text" value={firstName} onChange={(event) => this.handleOnChangeInput(event, 'firstName')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name" />: </label>
                                <input className="form-control" type="text" value={lastName} onChange={(event) => this.handleOnChangeInput(event, 'lastName')} />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" />: </label>
                                <input className="form-control" type="text" value={address} onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" />: </label>
                                <input className="form-control" type="text" value={phoneNumber} onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" />: </label>
                                <select value={gender} className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'gender')}>
                                    <option ></option>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" />: </label>
                                <select value={roleId} className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'roleId')}>
                                    <option ></option>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" />: </label>
                                <select value={positionId} className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'positionId')}>
                                    <option ></option>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" />: </label>
                                <div className="preview-img-container">
                                    <input id="image" type="file" hidden onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label className="label-upload" htmlFor="image"><FormattedMessage id="manage-user.upload-img" /><i className="fas fa-upload"></i></label>
                                    <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button onClick={() => this.handleSaveUser()}
                                    className={this.state.action === CRUD_Actions.EDIT ? "btn btn-warning" : "btn btn-primary"}>
                                    {this.state.action === CRUD_Actions.EDIT ? <FormattedMessage id="manage-user.edit" />
                                        : <FormattedMessage id="manage-user.add" />
                                    }
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser handleEditUserFromParent={this.handleEditUser} action={this.state.action} />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gendersRedux: state.admin.genders,
        rolesRedux: state.admin.roles,
        positionsRedux: state.admin.positions,
        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUserStart: (data) => dispatch(actions.createNewUserStart(data)),
        editUserStart: (data) => dispatch(actions.editUserStart(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
