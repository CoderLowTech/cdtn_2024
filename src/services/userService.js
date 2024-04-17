import axios from "../axios"

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    });
}

const editUserService = (dataInput) => {
    return axios.put('/api/edit-user', dataInput);
}

const getAllcodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorsHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const postDoctorInfoService = (data) => {
    return axios.post(`/api/save-info-doctor`, data);
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraDoctorInforById = (doctorId) => {
    return axios.get(`/api/get-extra-doctor-infor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postBookAppointment = (data) => {
    return axios.post(`/api/post-book-appointment`, data);
}

const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-booking-appointment`, data);
}

const createSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const deleteSpecialty = (specialtyId) => {
    return axios.delete('/api/delete-specialty', {
        data: { id: specialtyId }
    });
}

const editSpecialty = (dataInput) => {
    return axios.put('/api/edit-specialty', dataInput);
}

const getListBookings = (dataInput) => {
    return axios.get(`/api/get-list-booking?doctorId=${dataInput.doctorId}&date=${dataInput.date}`);
}

const sendReceipt = (dataInput) => {
    return axios.post(`/api/send-receipt`, dataInput);
}

export {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllcodeService,
    getTopDoctorsHomeService,
    getAllDoctorsService,
    postDoctorInfoService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleByDate,
    getExtraDoctorInforById,
    getProfileDoctorById,
    postBookAppointment,
    postVerifyBookingAppointment,
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    deleteSpecialty,
    editSpecialty,
    getListBookings,
    sendReceipt
}
