import { create, get, getById, update } from 'apis/Apis';
import { put, takeEvery, call } from 'redux-saga/effects';
import {
    ADD_FAILED_BANK_ACCOUNT_DATA,
    ADD_SUCCESS_BANK_ACCOUNT_DATA,
    FAILED_GET_BANK_ACCOUNT_DATA_BY_ID,
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

//Bank account saga

export function* saveBankAccountSaga(action) {
    action.data.path = `${process.env.REACT_APP_ABC_BANKING_MANAGEMENT_URL}/account`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        console.log(responseData.data.payload);

        yield put({ type: ADD_SUCCESS_BANK_ACCOUNT_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: ADD_FAILED_BANK_ACCOUNT_DATA, data: responseData.data });
    }
}

export function* getvByIdSaga(action) {
    console.log('get BankAccount Saga BANK_ACCOUNT saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_FINANCE_URL}/BANK_ACCOUNT/${action.data.id}`);
        console.log(responseData.data.payload);
        yield put({ type: SUCCESS_GET_BANK_ACCOUNT_DATA_BY_ID, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_GET_BANK_ACCOUNT_DATA_BY_ID, data: responseData.data });
    }
}

export function* updateBankAccountSaga(action) {
    console.log('updateBANK_ACCOUNTSaga BANK_ACCOUNT saga');
    console.log(action);
    action.data.path = `${process.env.REACT_APP_FINANCE_URL}/BANK_ACCOUNT/${action.data.BANK_ACCOUNTCode}`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);
        console.log(responseData.data.payload);
        yield put({ type: UPDATE_SUCCESS_BANK_ACCOUNT_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_BANK_ACCOUNT_DATA, data: responseData.data });
    }
}

export function* getAllBankAccountSaga() {
    console.log('here');
    let responseData = [];

    try {
        responseData = yield call(get, process.env.REACT_APP_FINANCE_URL + '/BANK_ACCOUNTes');
        console.log(responseData.data.payload);
        yield put({ type: SUCCESS_BANK_ACCOUNT_LIST_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: FAILED_BANK_ACCOUNT_LIST_DATA, data: responseData.data });
    }
}

export function* checkDupicateBANK_ACCOUNTCodeSaga(action) {
    console.log('checkDupicateBANK_ACCOUNTCodeSaga BANK_ACCOUNT saga');
    console.log(action);

    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_FINANCE_URL}/BANK_ACCOUNTCodeCheck/${action.data.BANK_ACCOUNTCode}`);
        console.log(responseData);
        yield put({ type: BANK_ACCOUNT_DUPLICATE, data: responseData.data });
    } catch (e) {
        console.log(responseData);
        yield put({ type: BANK_ACCOUNT_DUPLICATE, data: responseData });
    }
}

export function* checkLatestBANK_ACCOUNTModifiedDateSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_FINANCE_URL}/BANK_ACCOUNTLastModifiedTime`);
        console.log('response data last:' + responseData);
        yield put({ type: SUCCESS_LAST_MODIFIED_DATE_BANK_ACCOUNT, data: responseData.data });
    } catch (e) {
        console.log('Error:' + e);
        yield put({ type: FAILED_LAST_MODIFIED_DATE_BANK_ACCOUNT, data: '' });
    }
}
