import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';

import { bankAcccountReducer } from './reducers/masterReducer/BankAcccountReducer';

import { managerReducer } from './reducers/masterReducer/ManagerReducer';

import { userReducer } from './reducers/athenticationReducers/UserReducer';

import { bankReducer } from './reducers/masterReducer/BankReducer';
import { branchReducer } from './reducers/masterReducer/BranchReducer';
import { bankDetailReducer } from './reducers/masterReducer/BankDetailsReducer';
import { transactionReducer } from './reducers/masterReducer/TransactionReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    bankAcccountReducer,

    managerReducer,

    userReducer,

    bankReducer,
    branchReducer,

    bankDetailReducer,

    transactionReducer
});

export default reducer;
