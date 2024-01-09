import {
    ADD_FAILED_BANK_ACCOUNT_DATA,
    ADD_SUCCESS_BANK_ACCOUNT_DATA,
    FAILED_GET_BANK_ACCOUNT_DATA_BY_ID,
    FAILED_GET_BANK_ACCOUNT_DATA_BY_UNIQUE_ID,
    FAILED_LAST_MODIFIED_DATE_BANK_ACCOUNT,
    FAILED_BANK_ACCOUNT_LIST_DATA,
    SUCCESS_GET_BANK_ACCOUNT_DATA_BY_ID,
    SUCCESS_GET_BANK_ACCOUNT_DATA_BY_UNIQUE_ID,
    SUCCESS_LAST_MODIFIED_DATE_BANK_ACCOUNT,
    SUCCESS_BANK_ACCOUNT_LIST_DATA,
    BANK_ACCOUNT_DUPLICATE,
    UPDATE_FAILED_BANK_ACCOUNT_DATA,
    UPDATE_SUCCESS_BANK_ACCOUNT_DATA
} from 'store/constant/master/BankAccountConstant';

const initialState = {
    bankAccount: null,
    BANK_ACCOUNTes: [],
    BANK_ACCOUNTToUpdate: null,
    BANK_ACCOUNTToEdit: null,
    errorMsg: null,
    duplicateBANK_ACCOUNT: null,
    lastModifiedDateTime: null
};

export const bankAcccountReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_BANK_ACCOUNT_DATA:
            console.warn('SUCCESS_BANK_ACCOUNT_DATA', action.payload);
            console.log(data.payload[0]);
            return { ...state, bankAccount: data.payload[0] };

        case ADD_FAILED_BANK_ACCOUNT_DATA:
            console.warn('FAILED_BANK_ACCOUNT_DATA', action);
            console.log(data);
            return {
                ...state,
                bankAccount: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_BANK_ACCOUNT_DATA_BY_ID:
            console.warn('SUCCESS_GET_BANK_ACCOUNT_DATA_BY_ID', action.payload);
            console.log(data.payload[0]);
            return { ...state, BANK_ACCOUNTToUpdate: data.payload[0] };

        case FAILED_GET_BANK_ACCOUNT_DATA_BY_ID:
            console.warn('FAILED_GET_BANK_ACCOUNT_DATA_BY_ID', action);
            console.log(data);
            return {
                ...state,
                BANK_ACCOUNTToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_BANK_ACCOUNT_DATA_BY_UNIQUE_ID:
            console.warn('SUCCESS_GET_BANK_ACCOUNT_DATA_BY_ID', action.payload);
            console.log(data.payload[0]);
            return { ...state, BANK_ACCOUNTToEdit: data.payload[0] };

        case FAILED_GET_BANK_ACCOUNT_DATA_BY_UNIQUE_ID:
            console.warn('FAILED_GET_BANK_ACCOUNT_DATA_BY_UNIQUE_ID', action);
            console.log(data);
            return {
                ...state,
                BANK_ACCOUNTToEdit: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };
        case UPDATE_SUCCESS_BANK_ACCOUNT_DATA:
            console.log(data.payload[0]);
            console.warn('UPDATE_SUCCESS_BANK_ACCOUNT_DATA', action);
            console.log(data.payload[0]);
            return { ...state, BANK_ACCOUNT: data.payload[0] };

        case UPDATE_FAILED_BANK_ACCOUNT_DATA:
            console.warn('UPDATE_FAILED_BANK_ACCOUNT_DATA', action);
            console.log(data);
            return {
                ...state,
                BANK_ACCOUNT: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_BANK_ACCOUNT_LIST_DATA:
            console.warn('SUCCESS_BANK_ACCOUNT_LIST_DATA', action);

            console.log(data.payload[0]);
            return { ...state, BANK_ACCOUNTes: data.payload[0] };

        case FAILED_BANK_ACCOUNT_LIST_DATA:
            console.warn('FAILED_BANK_ACCOUNT_LIST_DATA', action);

            console.log(data);
            return { ...state, BANK_ACCOUNTes: data };

        case BANK_ACCOUNT_DUPLICATE:
            return { ...state, duplicateBANK_ACCOUNT: data };

        case SUCCESS_LAST_MODIFIED_DATE_BANK_ACCOUNT:
            console.log('reducer:' + data.payload[0]);
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case FAILED_LAST_MODIFIED_DATE_BANK_ACCOUNT:
            return { ...state, lastModifiedDateTime: data };

        default:
            return state;
    }
};
