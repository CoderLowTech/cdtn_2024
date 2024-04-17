import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils, CRUD_Actions } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import Lightbox from 'react-image-lightbox';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { createSpecialty, editSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageSpecialty from './TableManageSpecialty';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImageUrl: '',
            isOpen: false,
            action: CRUD_Actions.CREATE,
            specialtyId: '',
            currentSpecialtyId: '',
        }
    }

    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
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

    handleSaveSpecialty = async () => {
        let { action } = this.state;
        if (action === CRUD_Actions.CREATE) {
            let res = await createSpecialty({
                name: this.state.name,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                image: this.state.image
            })
            if (res && res.errorCode === 0) {
                toast.success('Create new Specialty successful');
                this.setState({
                    name: '',
                    image: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewImageUrl: '',
                    isOpen: false,
                    action: CRUD_Actions.CREATE,
                })
            } else {
                toast.error('Create new Specialty failed')
            }
        }
        if (action === CRUD_Actions.EDIT) {
            let res = await editSpecialty({
                id: this.state.currentSpecialtyId,
                name: this.state.name,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                image: this.state.image
            })
            if (res && res.errorCode === 0) {
                toast.success("Update specialty success");
                this.setState({
                    name: '',
                    image: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewImageUrl: '',
                    isOpen: false,
                    action: CRUD_Actions.CREATE,
                })
            } else {
                toast.error("Update specialty failed");
            }
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

    handleEditSpecialty = (specialty) => {
        this.setState({
            action: CRUD_Actions.EDIT,
            currentSpecialtyId: specialty.id,
            name: specialty.name,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            image: specialty.image,
            previewImageUrl: specialty.image
        })
    }

    render() {
        console.log('check image:', this.state.image);
        console.log('check preview image:', this.state.previewImageUrl);
        return (
            <div className="manage-specialty-container">
                <div className="manage-specialty-title"><FormattedMessage id="manage-specialty.title" /></div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="manage-specialty.name" />:</label>
                        <input onChange={(event) => this.handleOnChangeInput(event, 'name')} type="text" className="form-control" value={this.state.name} />
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="manage-specialty.image" />:</label>
                        <div className="preview-img-container">
                            <input id="image" type="file" hidden onChange={(event) => this.handleOnchangeImage(event)} />
                            <label className="label-upload" htmlFor="image"><FormattedMessage id="manage-specialty.upload-image" /><i className="fas fa-upload"></i></label>
                            <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>
                    </div>
                    <div className="manage-specialty-editor col-12">
                        <label></label>
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button onClick={() => this.handleSaveSpecialty()} className={this.state.action === CRUD_Actions.EDIT ? "btn-save-specialty" : "btn-save-new-specialty"}>
                            {this.state.action === CRUD_Actions.EDIT
                                ? <FormattedMessage id="manage-specialty.save" />
                                : <FormattedMessage id="manage-specialty.save-new" />
                            }
                        </button>
                    </div>
                    <div className="all-specialty col-12 mb-5">
                        <TableManageSpecialty handleEditSpecialtyFromParent={this.handleEditSpecialty} />
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
