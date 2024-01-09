import {
    CHECK_BANK_ACCOUNT_DUPLICATE,
    GET_ALL_BANK_ACCOUNT_DATA,
    GET_LAST_MODIFIED_DATE_TIME_BANK_ACCOUNT,
    GET_BANK_ACCOUNT_DATA_BY_ID,
    GET_BANK_ACCOUNT_DATA_BY_UNIQUE_ID,
    SAVE_BANK_ACCOUNT_DATA,
    BANK_ACCOUNT_DUPLICATE,
    UPDATE_BANK_ACCOUNT_DATA
} from 'store/constant/master/BankAccountConstant';

export const saveBANK_ACCOUNTData = (data) => {
    console.log('saveBANK_ACCOUNTData action s called', data);
    return {
        type: SAVE_BANK_ACCOUNT_DATA,
        data
    };
};

export const updateBANK_ACCOUNTData = (data) => {
    console.log('updateBANK_ACCOUNTData action s called', data);
    return {
        type: UPDATE_BANK_ACCOUNT_DATA,
        data
    };
};
export const getBANK_ACCOUNTDataById = (id) => {
    console.log('getBANK_ACCOUNTDataByCode  called', id);
    return {
        type: GET_BANK_ACCOUNT_DATA_BY_ID,
        data: { id }
    };
};

export const getBANK_ACCOUNTDataByUniqueId = (id) => {
    console.log('getBANK_ACCOUNTDataById  called', id);
    return {
        type: GET_BANK_ACCOUNT_DATA_BY_UNIQUE_ID,
        data: { id }
    };
};

export const getAllBANK_ACCOUNTData = () => {
    console.log('getAllBANK_ACCOUNTData  called');
    return {
        type: GET_ALL_BANK_ACCOUNT_DATA
    };
};

export const checkDuplicateBANK_ACCOUNTCode = (BANK_ACCOUNTCode) => {
    console.log('getAllBANK_ACCOUNTData  called');
    return {
        type: CHECK_BANK_ACCOUNT_DUPLICATE,
        data: { BANK_ACCOUNTCode }
    };
};

export const BANK_ACCOUNTDuplicateError = (data) => {
    console.log('getAllBANK_ACCOUNTData  called');
    return {
        type: BANK_ACCOUNT_DUPLICATE,
        data: data
    };
};

export const getLatestModifiedBANK_ACCOUNTDetails = () => {
    return {
        type: GET_LAST_MODIFIED_DATE_TIME_BANK_ACCOUNT
    };
};
