import { takeLatest } from 'redux-saga/effects';

import {
    saveBankAccountSaga,
    getvByIdSaga,
    getAllBankAccountSaga,
    updateBankAccountSaga,
    checkDupicateTaxCodeSaga,
    checkLatestTaxModifiedDateSaga
} from './mastersaga/BankAccountSaga';
import {
    SAVE_BANK_ACCOUNT_DATA,
    GET_BANK_ACCOUNT_DATA_BY_ID,
    GET_ALL_BANK_ACCOUNT_DATA,
    UPDATE_BANK_ACCOUNT_DATA,
    CHECK_BANK_ACCOUNT_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_BANK_ACCOUNT
} from 'store/constant/master/BankAccountConstant';

import {
    CHECK_MANAGER_CODE_DUPLICATE,
    GET_ALL_ACTIVE_MANAGER_DATA,
    GET_ALL_MANAGER_DATA,
    GET_MANAGER_DETAILS_BY_CODE,
    GET_MANAGER_LAST_MODIFIED_DATE_TIME,
    SAVE_MANAGER_DATA,
    UPDATE_MANAGER_DATA
} from 'store/constant/master/ManagerConstant';

import {
    saveManagerDataHandler,
    getAllManagerDataSaga,
    getManagerDetailsByCodeSaga,
    getManagerLatestModifiedDateSaga,
    checkManagerDupicateCodeSaga,
    updateManagerDataSaga,
    getAllActiveManagerDataSaga
} from './mastersaga/ManagerSaga';

import {
    CHECK_USER_DUPLICATE,
    GET_ACTIVE_USERS,
    GET_ALL_USER_DATA,
    GET_ALL_USER_ROLES,
    GET_LAST_MODIFIED_DATE_TIME_USER,
    GET_USER_DATA_BY_ID,
    SAVE_USER_DATA,
    UPDATE_USER_DATA,
    CHECK_USER_LOGIN_CREDENTIALS,
    FORGOT_PASSWORD_CREDENTIALS,
    RESET_PASSWORD_CREDENTIALS,
    GET_PROFILE_DATA_BY_ID,
    UPDATE_MY_PROFILE,
    CLEAR_USER,
    USER_LIST_WITH_ACCOUNTS
} from 'store/constant/authentication/UserConstant';
import {
    checkDupicateUserSaga,
    checkLatestUserModifiedDateSaga,
    getAllActiveUsers,
    getAllRolesSaga,
    getAllUserSaga,
    getUserByIdSaga,
    saveUserSaga,
    updateUserSaga,
    userLoginSaga,
    forgotPasswordSaga,
    resetPasswordSaga,
    getProfileDataByIdSaga,
    updateMyProfileData,
    clearUserDataSaga,
    getUsersWithAccounts
} from './authenticationSaga/UserSaga';

import {
    CHECK_BRANCH_DUPLICATE,
    GET_ALL_BANK_DATA,
    GET_ALL_BRANCH_DATA,
    GET_BRANCH_DATA_BY_ID,
    GET_LAST_MODIFIED_DATE_TIME_BRANCH,
    SAVE_BANK_DATA,
    SAVE_BRANCH_DATA,
    UPDATE_BRANCH_DATA,
    SAVE_BANK_DETAILS_DATA,
    UPDATE_BANK_DETAILS_DATA,
    GET_ALL_BANK_DETAILS_DATA,
    CHECK_BANK_DETAILS_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_BANK_DETAILS,
    GET_BANK_DETAILS_DATA_BY_ID,
    GET_BRANCHES_BY_BANK_ID,
    CHECKED_SAVED_BANK_AND_BRANCH
} from 'store/constant/master/BankConstant';
import {
    saveBankSaga,
    getAllBankSaga,
    saveBranchSaga,
    getAllBranchesSaga,
    checkDupicateBranchesSaga,
    updateBranchSaga,
    getBranchByIdSaga,
    checkLatestBranchModifiedDateSaga,
    saveBankDetailsSaga,
    updateBankDetailsSaga,
    checkLatestBankDetailsModifiedDateSaga,
    checkDupicateBankDetailsSaga,
    getAllBankDetailsSaga,
    checkDupicateBankSaga,
    getBranchesByBankId,
    getSavedBankBrachData,
    getBankDetailsByIdSaga,
    getAllActiveBranchManagersSaga
} from './mastersaga/Bank&BranchSaga';

import { DEPOSIT_AMOUNT, WITHDRAW_AMOUNT, BANK_STATEMENT, TRANSFER_MONEY } from 'store/constant/master/TransactionConstant';

import { depositSaga, withdrawSaga, bankStatementSaga, transferMoneySaga } from 'store/saga/mastersaga/TransactionSaga';
export function* wacherSaga() {
    // bank account setup
    yield takeLatest(SAVE_BANK_ACCOUNT_DATA, saveBankAccountSaga);
    // yield takeLatest(GET_BANK_ACCOUNT_DATA_BY_ID, getBANK_ACCOUNTDataById);
    yield takeLatest(GET_ALL_BANK_ACCOUNT_DATA, getAllBankAccountSaga);
    yield takeLatest(UPDATE_BANK_ACCOUNT_DATA, updateBankAccountSaga);

    // transaction setup
    yield takeLatest(DEPOSIT_AMOUNT, depositSaga);
    yield takeLatest(WITHDRAW_AMOUNT, withdrawSaga);
    yield takeLatest(BANK_STATEMENT, bankStatementSaga);
    yield takeLatest(TRANSFER_MONEY, transferMoneySaga);

    // //User data
    yield takeLatest(SAVE_USER_DATA, saveUserSaga);
    yield takeLatest(GET_USER_DATA_BY_ID, getUserByIdSaga);
    yield takeLatest(GET_ALL_USER_DATA, getAllUserSaga);
    yield takeLatest(UPDATE_USER_DATA, updateUserSaga);
    yield takeLatest(CHECK_USER_DUPLICATE, checkDupicateUserSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_USER, checkLatestUserModifiedDateSaga);
    yield takeLatest(GET_ACTIVE_USERS, getAllActiveUsers);
    yield takeLatest(GET_ALL_USER_ROLES, getAllRolesSaga);
    yield takeLatest(GET_PROFILE_DATA_BY_ID, getProfileDataByIdSaga);
    yield takeLatest(CLEAR_USER, clearUserDataSaga);
    yield takeLatest(USER_LIST_WITH_ACCOUNTS, getUsersWithAccounts);

    //login
    yield takeLatest(CHECK_USER_LOGIN_CREDENTIALS, userLoginSaga);

    //manager
    yield takeLatest(SAVE_MANAGER_DATA, saveManagerDataHandler);
    yield takeLatest(GET_ALL_MANAGER_DATA, getAllManagerDataSaga);
    yield takeLatest(GET_MANAGER_DETAILS_BY_CODE, getManagerDetailsByCodeSaga);
    yield takeLatest(GET_MANAGER_LAST_MODIFIED_DATE_TIME, getManagerLatestModifiedDateSaga);
    yield takeLatest(CHECK_MANAGER_CODE_DUPLICATE, checkManagerDupicateCodeSaga);
    yield takeLatest(UPDATE_MANAGER_DATA, updateManagerDataSaga);
    yield takeLatest(GET_ALL_ACTIVE_MANAGER_DATA, getAllActiveManagerDataSaga);

    //bank
    yield takeLatest(SAVE_BANK_DATA, saveBankSaga);
    yield takeLatest(GET_ALL_BANK_DATA, getAllActiveBranchManagersSaga);

    // branch
    yield takeLatest(SAVE_BRANCH_DATA, saveBranchSaga);
    yield takeLatest(GET_ALL_BRANCH_DATA, getAllBranchesSaga);
    yield takeLatest(GET_BRANCH_DATA_BY_ID, getBranchByIdSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_BRANCH, checkLatestBranchModifiedDateSaga);
    yield takeLatest(CHECK_BRANCH_DUPLICATE, checkDupicateBranchesSaga);
    yield takeLatest(UPDATE_BRANCH_DATA, updateBranchSaga);
    yield takeLatest(GET_BRANCHES_BY_BANK_ID, getBranchesByBankId);
    yield takeLatest(CHECKED_SAVED_BANK_AND_BRANCH, getSavedBankBrachData);
    // yield takeLatest(GET_ALL_ACTIVE_BRANCH, getAllActiveActivity_SupplimentDataSaga);

    //bank Details
    yield takeLatest(SAVE_BANK_DETAILS_DATA, saveBankDetailsSaga);
    yield takeLatest(GET_BANK_DETAILS_DATA_BY_ID, getBankDetailsByIdSaga);
    yield takeLatest(GET_ALL_BANK_DETAILS_DATA, getAllBankDetailsSaga);
    yield takeLatest(UPDATE_BANK_DETAILS_DATA, updateBankDetailsSaga);
    yield takeLatest(CHECK_BANK_DETAILS_DUPLICATE, checkDupicateBankSaga);
    yield takeLatest(GET_LAST_MODIFIED_DATE_TIME_BANK_DETAILS, checkLatestBankDetailsModifiedDateSaga);
}
