import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import * as actions from '../../../store/actions';
import { getAllSpecialty, deleteSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

class TableManageSpecialty extends Component {

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
                listSpecialty: res.data ? res.data.reverse() : []
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.listSpecialty !== this.state.listSpecialty) {
            let res = await getAllSpecialty();
            if (res && res.errorCode === 0) {
                this.setState({
                    listSpecialty: res.data ? res.data.reverse() : []
                });
            }
        }
    }

    handleDeleteUser = async (specialtyId) => {
        let res = await deleteSpecialty(specialtyId);
        if (res && res.errorCode === 0) {
            toast.success('Delete specialty success');

        } else {
            toast.error('Delete specialty failed');
        }
    }

    handleEditSpecialty = (specialty) => {
        this.props.handleEditSpecialtyFromParent(specialty);
    }

    render() {
        let { listSpecialty } = this.state;
        return (
            <React.Fragment>
                <table id="TableManageSpecialty">
                    <tbody>
                        <tr>
                            <th><FormattedMessage id="table.name-specialty" /></th>
                            <th></th>
                        </tr>
                        {listSpecialty && listSpecialty.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button onClick={() => this.handleEditSpecialty(item)} className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
