import {
    SUCCESS_DEPOSIT_AMOUNT,
    FAILED_DEPOSIT_AMOUNT,
    SUCCESS_WITHDRAW_AMOUNT,
    FAILED_WITHDRAW_AMOUNT,
    SUCCESS_BANK_STATEMENT,
    FAILED_BANK_STATEMENT
} from 'store/constant/master/TransactionConstant';
const initialState = {
    withdrawAmount: null,
    depositAmount: null,
    bankStatemetList: null,
    errorMsg: null
};

export const transactionReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case SUCCESS_DEPOSIT_AMOUNT:
            console.warn('SUCCESS_BANK_ACCOUNT_DATA', action.payload);
            console.log(data.payload[0]);
            return { ...state, depositAmount: data.payload[0] };

        case FAILED_DEPOSIT_AMOUNT:
            console.warn('FAILED_BANK_ACCOUNT_DATA', action);
            console.log(data);
            return {
                ...state,
                depositAmount: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_WITHDRAW_AMOUNT:
            console.warn('SUCCESS_GET_BANK_ACCOUNT_DATA_BY_ID', action.payload);
            console.log(data.payload[0]);
            return { ...state, withdrawAmount: data.payload[0] };

        case FAILED_WITHDRAW_AMOUNT:
            console.warn('FAILED_GET_BANK_ACCOUNT_DATA_BY_ID', action);
            console.log(data);
            return {
                ...state,
                withdrawAmount: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_BANK_STATEMENT:
            return { ...state, bankStatemetList: data.payload[0] };

        case FAILED_BANK_STATEMENT:
            return {
                ...state,
                bankStatemetList: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        default:
            return state;
    }
};
