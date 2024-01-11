import { DEPOSIT_AMOUNT, WITHDRAW_AMOUNT, BANK_STATEMENT, TRANSFER_MONEY } from '../../constant/master/TransactionConstant';
// Transaction set up

export const depositAmount = (data) => {
    return {
        type: DEPOSIT_AMOUNT,
        data
    };
};

export const withdrawAmount = (data) => {
    return {
        type: WITHDRAW_AMOUNT,
        data
    };
};

export const getBankStatement = (data) => {
    return {
        type: BANK_STATEMENT,
        data
    };
};

export const transferMoney = (data) => {
    return {
        type: TRANSFER_MONEY,
        data
    };
};
// export const checkDuplicatebankBankCode = (code) => {
//     return {
//         type: CHECK_BANK_DUPLICATE,
//         data: { code }
//     };
// };
