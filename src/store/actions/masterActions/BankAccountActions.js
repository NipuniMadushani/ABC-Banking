import { SAVE_BANK_ACCOUNT_DATA, GET_ALL_BANK_ACCOUNT_DATA } from '../../constant/master/BankAccountConstant';
// BANK_ACCOUNT set up

export const saveBankAccountData = (data) => {
    return {
        type: SAVE_BANK_ACCOUNT_DATA,
        data
    };
};

export const getAllBankAccounts = () => {
    return {
        type: GET_ALL_BANK_ACCOUNT_DATA
    };
};

// export const getLatestModifiedBankDetails = () => {
//     return {
//         type: GET_LAST_MODIFIED_DATE_TIME_BANK
//     };
// };

// export const checkDuplicatebankBankCode = (code) => {
//     return {
//         type: CHECK_BANK_DUPLICATE,
//         data: { code }
//     };
// };
