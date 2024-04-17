import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter'
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput(e,id){
        let copyState = {...this.state}
        copyState[id]=e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidInput(){
        let isValid = true;
        let arrayInput = ['email','password','firstName','lastName','address'];
        for (let i = 0; i < arrayInput.length; i++){
            if(!this.state[arrayInput[i]]){
                isValid = false;
                alert('Missing paramete: ' + arrayInput[i]);
                break;
            }
        }
        return true;
    }

    handleAddNewUser(){
        let isValid = this.checkValidInput();
        if(isValid ===true){
            this.props.createNewUser(this.state);
        }else{
            return;
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={()=>this.toggle()} className="modal-user-container" size="lg">
                <ModalHeader toggle={()=>this.toggle()}>Create new user</ModalHeader>
                <ModalBody className="modal-user-body">
                    <div class="input-container">
                        <label for="email">Email</label>
                        <input type="email" onChange={(event)=>{this.handleOnChangeInput(event,'email')}} value={this.state.email} />
                    </div>
                    <div class="input-container">
                        <label for="password">Password</label>
                        <input type="password" onChange={(event)=>{this.handleOnChangeInput(event,'password')}} value={this.state.password}/>
                    </div>
                    <div class="input-container">
                        <label for="email">first Name:</label>
                        <input type="text" onChange={(event)=>{this.handleOnChangeInput(event,'firstName')}} value={this.state.firstName}/>
                    </div>
                    <div class="input-container">
                        <label for="password">last Name:</label>
                        <input type="text" onChange={(event)=>{this.handleOnChangeInput(event,'lastName')}} value={this.state.lastName}/>
                    </div>
                    <div class="input-container max-width-input">
                        <label for="email">Address</label>
                        <input type="text" onChange={(event)=>{this.handleOnChangeInput(event,'address')}} value={this.state.address}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={()=>{this.handleAddNewUser()}}>Add new</Button>
                    <Button color="secondary" className='px-3' onClick={()=>this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
