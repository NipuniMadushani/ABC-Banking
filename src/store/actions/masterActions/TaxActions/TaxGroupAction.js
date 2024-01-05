import {
    SAVE_BANK_ACCOUNT_GROUP_DATA,
    GET_ALL_BANK_ACCOUNT_GROUP_DATA,
    GET_BANK_ACCOUNT_GROUP_DATA_BY_ID,
    UPDATE_BANK_ACCOUNT_GROUP_DATA,
    CHECK_BANK_ACCOUNT_GROUP_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_BANK_ACCOUNT_GROUP,
    GET_ACTIVE_BANK_ACCOUNT_GROUP_LIST,
    GET_BANK_ACCOUNT_GROUP_AND_BANK_ACCOUNT_LIST
} from '../../../constant/master/BankAccountConstant';

export const saveBANK_ACCOUNTGroupData = (data) => {
    console.log('saveBANK_ACCOUNT group Data action s called', data);
    return {
        type: SAVE_BANK_ACCOUNT_GROUP_DATA,
        data
    };
};

export const getAllBANK_ACCOUNTGroupDetails = () => {
    console.log('get all group Data action s called');
    return {
        type: GET_ALL_BANK_ACCOUNT_GROUP_DATA
    };
};

export const getBANK_ACCOUNTGroupDataById = (id) => {
    console.log('getBANK_ACCOUNTDataById  called', id);
    return {
        type: GET_BANK_ACCOUNT_GROUP_DATA_BY_ID,
        data: { id }
    };
};

export const updateBANK_ACCOUNTGroupData = (data) => {
    console.log('getBANK_ACCOUNTDataById  called', data);
    return {
        type: UPDATE_BANK_ACCOUNT_GROUP_DATA,
        data: data
    };
};

export const checkDuplicateBANK_ACCOUNTGroupCode = (data) => {
    console.log('getBANK_ACCOUNTDataById  called', data);
    return {
        type: CHECK_BANK_ACCOUNT_GROUP_DUPLICATE,
        data: data
    };
};

export const getLatestModifiedBANK_ACCOUNTGroupDetails = () => {
    return {
        type: GET_LAST_MODIFIED_DATE_TIME_BANK_ACCOUNT_GROUP
    };
};

export const getActiveBANK_ACCOUNTGroupList = () => {
    return {
        type: GET_ACTIVE_BANK_ACCOUNT_GROUP_LIST
    };
};

export const getActiveBANK_ACCOUNTGroupandBANK_ACCOUNTList = (data) => {
    return {
        type: GET_BANK_ACCOUNT_GROUP_AND_BANK_ACCOUNT_LIST,
        data: data
    };
};
