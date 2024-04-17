import actionTypes from './actionTypes';
import {
    getAllcodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorsHomeService,
    getAllDoctorsService, postDoctorInfoService, getAllSpecialty
} from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    // 
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('GENDER');
            if (res && res.errorCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchRoleStart = () => {
    // 
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('ROLE');
            if (res && res.errorCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const fetchPositionStart = () => {
    // 
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('POSITION');
            if (res && res.errorCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errorCode === 0) {
                toast.success("Create new user successfully");
                dispatch(createNewUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Create new user failed");
                dispatch(createNewUserFail());
            }
        } catch (error) {
            toast.error("Create new user failed");
            dispatch(createNewUserFail());
        }
    }
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createNewUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errorCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFail());
            }
        } catch (error) {
            dispatch(fetchAllUsersFail());
        }
    }
}

export const fetchAllUsersSuccess = (usersData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: usersData
})

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})

export const deleteUserStart = (userId) => {
    // 
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errorCode === 0) {
                toast.success("Delete user successfully");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete user failed");
                dispatch(deleteUserFail());
            }
        } catch (error) {
            toast.error("Delete user failed");
            dispatch(deleteUserFail());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const editUserStart = (userData) => {
    // 
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userData);
            if (res && res.errorCode === 0) {
                toast.success("Update user successfully");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update user failed");
                dispatch(editUserFail());
            }
        } catch (error) {
            toast.error("Update user failed");
            dispatch(editUserFail());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorsHomeService('');
            if (res && res.errorCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data))
            } else {
                dispatch(fetchTopDoctorsFail);
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFail);
        }
    }
}

export const fetchTopDoctorsSuccess = (doctorsData) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    topDoctors: doctorsData
})

export const fetchTopDoctorsFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
})

export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errorCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data))
            } else {
                dispatch(fetchAllDoctorsFail);
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFail);
        }
    }
}

export const fetchAllDoctorsSuccess = (doctorsData) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    allDoctors: doctorsData
})

export const fetchAllDoctorsFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
})

export const saveDetailDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await postDoctorInfoService(data);
            if (res && res.errorCode === 0) {
                toast.success("Save info detail doctor successfully");
                dispatch(saveDetailDoctorSuccess())
            } else {
                toast.error("Save info detail doctor failed");
                dispatch(saveDetailDoctorFail);
            }
        } catch (error) {
            toast.error("Save info detail doctor failed");
            dispatch(saveDetailDoctorFail);
        }
    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
})

export const saveDetailDoctorFail = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
})

export const fetchAllSchedulesStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('TIME');
            if (res && res.errorCode === 0) {
                dispatch(fetchAllSchedulesSuccess(res.data))
            } else {
                dispatch(fetchAllSchedulesFail);
            }
        } catch (error) {
            dispatch(fetchAllSchedulesFail);
        }
    }
}

export const fetchAllSchedulesSuccess = (schedulesData) => ({
    type: actionTypes.FETCH_ALL_SCHEDULES_SUCCESS,
    allSchedules: schedulesData
})

export const fetchAllSchedulesFail = () => ({
    type: actionTypes.FETCH_ALL_SCHEDULES_FAIL
})

export const fetchRequiredDoctorInforStart = () => {
    // 
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllcodeService('PRICE');
            let resPayment = await getAllcodeService('PAYMENT');
            let resProvince = await getAllcodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            if (resPrice && resPrice.errorCode === 0
                && resPayment && resPayment.errorCode === 0
                && resProvince && resProvince.errorCode === 0
                && resSpecialty && resSpecialty.errorCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFail());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInforFail());
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredDoctorInfor) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    allRequiredDoctorInfor: allRequiredDoctorInfor
})

export const fetchRequiredDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL
})
