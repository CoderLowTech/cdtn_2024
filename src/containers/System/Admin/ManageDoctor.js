import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_Actions, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";

import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: '',
      contentHTML: '',
      selectedDoctor: '',
      description: '',
      listDoctors: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      selectedSpecialty: '',
      selectedClinic: '',
      nameClinic: '',
      addressClinic: '',
      note: '',
      clinicId: '',
      specialtyId: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.getAllRequireDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux, 'USERS');
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInforRedux;
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux, 'USERS');
      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty
      });
    }
    if (prevProps.allRequiredDoctorInforRedux !== this.props.allRequiredDoctorInforRedux) {
      let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInforRedux;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty
      })
    }
  }

  buildDataInputSelect = (inputData, type) => {
    let language = this.props.language;
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === 'USERS') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
          let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;

          result.push(object);
        });
      }
      if (type === 'PRICE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VNĐ`;
          let labelEn = `${item.valueEn} USD`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }
      if (type === 'PAYMENT' || type === 'PROVINCE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }
      if (type === 'SPECIALTY' || type === 'CLINIC') {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;

          result.push(object);
        });
      }
    }

    return result;
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChangeSelectDoctor = async (selectedDoctor) => {
    this.setState({
      selectedDoctor: selectedDoctor,
    });
    let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errorCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = '';
      let nameClinic = '';
      let note = '';
      let paymentId = '';
      let priceId = '';
      let provinceId = '';
      let specialtyId = '';
      let clinicId = '';
      let selectedPrice = '';
      let selectedPayment = '';
      let selectedProvince = '';
      let selectedSpecialty = '';
      let selectedClinic = '';
      if (res.data.Doctor_Infor) {
        let doctorInfor = res.data.Doctor_Infor;
        priceId = doctorInfor.priceId;
        paymentId = doctorInfor.paymentId;
        provinceId = doctorInfor.provinceId;
        nameClinic = doctorInfor.nameClinic;
        addressClinic = doctorInfor.addressClinic;
        specialtyId = doctorInfor.specialtyId;
        clinicId = doctorInfor.clinicId;
        note = doctorInfor.note;

        selectedPrice = listPrice.find(item => {
          return item && item.value === priceId
        });

        selectedPayment = listPayment.find(item => {
          return item && item.value === paymentId
        });

        selectedProvince = listProvince.find(item => {
          return item && item.value === provinceId
        })

        selectedSpecialty = listSpecialty.find(item => {
          return item && item.value === specialtyId
        })

        selectedClinic = listClinic.find(item => {
          return item && item.value === clinicId
        })

      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
        hasOldData: true
      });
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        selectedSpecialty: '',
        selectedClinic: '',
        nameClinic: '',
        addressClinic: '',
        note: '',
        hasOldData: false
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let nameState = name.name;
    let copyState = { ...this.state };
    copyState[nameState] = selectedOption;
    this.setState({
      ...copyState
    })

  }

  handleChangeText = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState })
  }


  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      selectedSpecialty: this.state.selectedSpecialty.value,
      selectedClinic: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note
    });
  };

  render() {
    let { hasOldData } = this.state;
    let language = this.props.language
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"><FormattedMessage id="manage-doctor.title" /></div>
        <div className="more-info">
          <div className="content-left form-group">
            <label><FormattedMessage id="manage-doctor.select-doctor" />:</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelectDoctor}
              options={this.state.listDoctors}
              placeholder={<FormattedMessage id="manage-doctor.select" />}
            />
          </div>
          <div className="content-right form-group">
            <label><FormattedMessage id="manage-doctor.description" />: </label>
            <textarea
              onChange={(event) => this.handleChangeText(event, 'description')}
              value={this.state.description}
              className="form-control"
            ></textarea>
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label><FormattedMessage id="manage-doctor.price" />:</label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              name="selectedPrice"
              placeholder={<FormattedMessage id="manage-doctor.select" />}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="manage-doctor.payment" />:</label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              name="selectedPayment"
              placeholder={<FormattedMessage id="manage-doctor.select" />}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="manage-doctor.province" />:</label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              name="selectedProvince"
              placeholder={<FormattedMessage id="manage-doctor.select" />}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="manage-doctor.clinic-name" />:</label>
            <input type="text" className="form-control"
              onChange={(event) => this.handleChangeText(event, 'nameClinic')}
              value={this.state.nameClinic} />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="manage-doctor.clinic-address" />:</label>
            <input type="text" className="form-control"
              onChange={(event) => this.handleChangeText(event, 'addressClinic')}
              value={this.state.addressClinic} />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="manage-doctor.note" />:</label>
            <input type="text" className="form-control"
              onChange={(event) => this.handleChangeText(event, 'note')}
              value={this.state.note} />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="manage-doctor.specialty" />:</label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listSpecialty}
              name="selectedSpecialty"
              placeholder={<FormattedMessage id="manage-doctor.select" />}
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <label><FormattedMessage id="manage-doctor.detail-info" />: </label>
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
        >
          {hasOldData === true ? <FormattedMessage id="manage-doctor.save" /> : <FormattedMessage id="manage-doctor.save-new" />}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctorsRedux: state.admin.allDoctors,
    allRequiredDoctorInforRedux: state.admin.allRequiredDoctorInfor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    getAllRequireDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInforStart()),
    saveDetailDoctorRedux: (data) =>
      dispatch(actions.saveDetailDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
