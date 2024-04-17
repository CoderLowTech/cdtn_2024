import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersReact: []
        }
    }

    componentDidMount() {
        this.props.fetchAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.usersRedux !== this.props.usersRedux) {
            let users = this.props.usersRedux;
            this.setState({ usersReact: users });
        }
    }

    handleDeleteUser = (userId) => {
        this.props.deleteUserRedux(userId);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    }

    render() {
        let arrayUsers = this.state.usersReact;
        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th><FormattedMessage id="table.firstName" /></th>
                            <th><FormattedMessage id="table.lastName" /></th>
                            <th><FormattedMessage id="table.address" /></th>
                            <th></th>
                        </tr>
                        {arrayUsers && arrayUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button onClick={() => this.handleEditUser(item)} className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                        <button onClick={() => this.handleDeleteUser(item.id)} className="btn-delete"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUserStart(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
