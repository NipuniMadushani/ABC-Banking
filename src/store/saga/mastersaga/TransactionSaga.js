import { create, get, getById, update } from 'apis/Apis';
import { put, takeEvery, call } from 'redux-saga/effects';
import {
    SUCCESS_DEPOSIT_AMOUNT,
    FAILED_DEPOSIT_AMOUNT,
    SUCCESS_WITHDRAW_AMOUNT,
    FAILED_WITHDRAW_AMOUNT,
    SUCCESS_BANK_STATEMENT,
    FAILED_BANK_STATEMENT,
    SUCCESS_TRANSFER_MONEY,
    FAILED_TRANSFER_MONEY
} from 'store/constant/master/TransactionConstant';

//Transaction saga

export function* depositSaga(action) {
    action.data.path = `${process.env.REACT_APP_ABC_TRANSACTION_BANKING_MANAGEMENT_URL}/transaction`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        console.log(responseData.data.payload);

        yield put({ type: SUCCESS_DEPOSIT_AMOUNT, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_DEPOSIT_AMOUNT, data: responseData.data });
    }
}

export function* withdrawSaga(action) {
    action.data.path = `${process.env.REACT_APP_ABC_TRANSACTION_BANKING_MANAGEMENT_URL}/transaction`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        console.log(responseData.data.payload);

        yield put({ type: SUCCESS_WITHDRAW_AMOUNT, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_WITHDRAW_AMOUNT, data: responseData.data });
    }
}

export function* bankStatementSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(
            getById,
            `${process.env.REACT_APP_ABC_TRANSACTION_BANKING_MANAGEMENT_URL}/allTransactionByAccount/${action.data}`
        );
        console.log(responseData.data.payload);

        yield put({ type: SUCCESS_BANK_STATEMENT, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_BANK_STATEMENT, data: responseData.data });
    }
}

export function* transferMoneySaga(action) {
    action.data.path = `${process.env.REACT_APP_ABC_TRANSACTION_BANKING_MANAGEMENT_URL}/transaction`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);
        console.log(responseData.data.payload);

        yield put({ type: SUCCESS_TRANSFER_MONEY, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_TRANSFER_MONEY, data: responseData.data });
    }
}
