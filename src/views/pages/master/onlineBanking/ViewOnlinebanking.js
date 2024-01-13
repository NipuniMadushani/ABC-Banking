import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'utils/MaterialTableIcons';
import OnlineBanking from './OnlineBanking';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import SuccessMsg from '../../../../messages/SuccessMsg';
import ErrorMsg from '../../../../messages/ErrorMsg';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import BankStatement from './BankStatement';
import { customersWithAccountsAction } from 'store/actions/authenticationActions/UserAction';
import TransferMoney from './TransferMoney';

function ViewOnlinebanking() {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const [type, setType] = useState('');
    const [openWithdrwal, setOpenWithdrwal] = useState(false);
    const [openDeposit, setOpenDeposit] = useState(false);
    const [openStatement, setOpenStatement] = useState(false);
    const [storeData, setStoreData] = useState(null);
    const [roleMode, setRoleMode] = useState(false);
    const [openMoneyTransfer, setOpenMoneyTransfer] = useState(false);

    const [disableWithdraw, setdisableWithdraw] = useState(false);
    const [disableDeposit, setdisableDeposit] = useState(false);
    const [disableBankStatement, setdisableBankStatement] = useState(false);
    const [disableTransfer, setdisableTransfer] = useState(false);
    const columns = [
        {
            title: 'First Name',
            field: 'firstName',
            filterPlaceholder: 'filter',
            align: 'left'
        },
        {
            title: 'User Name',
            field: 'userName',
            filterPlaceholder: 'filter',
            align: 'left'
        },
        {
            title: 'Email',
            field: 'email',
            filterPlaceholder: 'filter',
            align: 'left'
        },
        {
            title: 'Withdrwal',
            render: (rowData) => (
                <Button
                    variant="outlined"
                    type="button"
                    onClick={() => handleButtonClick('Withdrawal', rowData)}
                    disabled={disableWithdraw}
                >
                    Withdraw
                </Button>
            ),
            align: 'center'
        },

        {
            title: 'Deposit',
            render: (rowData) => (
                <Button variant="outlined" type="button" onClick={() => handleButtonClick('Deposit', rowData)} disabled={disableDeposit}>
                    Deposit
                </Button>
            ),
            align: 'center'
        },
        {
            title: 'Download Statement',
            render: (rowData) => (
                <Button
                    variant="outlined"
                    type="button"
                    onClick={() => handleButtonClick('statement', rowData)}
                    disabled={disableBankStatement}
                >
                    Download Statement
                </Button>
            ),
            align: 'center'
        },
        {
            title: 'Download Statement',
            render: (rowData) => (
                <Button variant="outlined" type="button" onClick={() => handleButtonClick('transfer', rowData)} disabled={disableTransfer}>
                    Money Transfer
                </Button>
            ),
            align: 'center'
        }
    ];

    const handleButtonClick = (type, rowData) => {
        // Add your button click logic here
        console.log('Button clicked for:', rowData);
        if (type == 'Withdrawal') {
            setStoreData(rowData);
            setOpenWithdrwal(true);
        } else if (type == 'Deposit') {
            setStoreData(rowData);
            setOpenDeposit(true);
        } else if (type == 'statement') {
            setStoreData(rowData);
            setOpenStatement(true);
        } else if (type == 'transfer') {
            setStoreData(rowData);
            setOpenMoneyTransfer(true);
        }
    };

    const dispatch = useDispatch();

    const customersWithAccounts = useSelector((state) => state.userReducer.customersWithAccounts);

    const withdrawAmount = useSelector((state) => state.transactionReducer.withdrawAmount);
    const depositAmount = useSelector((state) => state.transactionReducer.depositAmount);
    const transferMoney = useSelector((state) => state.transactionReducer.transferMoney);

    const error = useSelector((state) => state.transactionReducer.error);
    // useEffect(() => {
    //     console.log(customersWithAccounts);

    //     if (customersWithAccounts) {
    //         console.log(customersWithAccounts);
    //         setTableData(customersWithAccounts);
    //     }
    // }, [customersWithAccounts]);

    // useEffect(() => {
    //     if (customersWithAccounts) {
    //         if (logUserData.roles == 'ADMIN' || logUserData.roles == 'MANAGER') {
    //             setTableData(users);
    //         } else if (logUserData.roles == 'CUSTOMER') {
    //             console.warn(logUserData.userName);
    //             console.warn(customersWithAccounts);
    //             let account = customersWithAccounts.filter((data) => logUserData.userName == data.userName);
    //             console.warn(account);
    //             setTableData(account);
    //         }
    //     }
    // }, [customersWithAccounts]);

    let data = null;
    data = localStorage.getItem('userData');
    let logUserData = JSON.parse(data);
    useEffect(() => {
        console.log(logUserData);
        if (logUserData) {
            if (logUserData.roles == 'ADMIN' || logUserData.roles == 'MANAGER') {
                setRoleMode(true);
            } else if (logUserData.roles == 'CUSTOMER') {
                setRoleMode(false);
            }
        }
    }, [logUserData]);

    useEffect(() => {
        if (customersWithAccounts) {
            if (logUserData.roles == 'ADMIN' || logUserData.roles == 'MANAGER') {
                setTableData(customersWithAccounts);
                setdisableBankStatement(false);
                setdisableDeposit(false);
                setdisableTransfer(true);
                setdisableWithdraw(false);
            } else if (logUserData.roles == 'CUSTOMER') {
                console.warn(logUserData.userName);
                console.warn(customersWithAccounts);
                let account = customersWithAccounts.filter((data) => logUserData.userName == data.userName);
                console.warn(account);
                setTableData(account);
                setTableData(account);
                setdisableBankStatement(false);
                setdisableDeposit(true);
                setdisableTransfer(false);
                setdisableWithdraw(true);
            }
        }
    }, [customersWithAccounts]);

    useEffect(() => {
        console.log(error);
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        if (withdrawAmount || depositAmount || transferMoney) {
            console.log('sucessToast');
            setHandleToast(true);
            dispatch(customersWithAccountsAction());
        }
    }, [withdrawAmount, depositAmount, transferMoney]);

    const handleClickOpen = (type, data) => {
        console.log(type);
        console.log(data);
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setCode(data.id);
            if (data.type === 'Department') {
                setType(data.type);
            } else if (data.type === 'Designation') {
                setType(data.type);
            }
        } else if (type === 'INSERT') {
            setCode('');
            setMode(type);
            setType('');
        } else {
            setMode(type);
            setCode(data.id);
            if (data.type === 'Department') {
                setType(data.type);
            } else if (data.type === 'Designation') {
                setType(data.type);
            }
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenDeposit(false);
        setOpenWithdrwal(false);
        setOpenStatement(false);
        setOpenMoneyTransfer(false);
    };

    const handleToast = () => {
        setHandleToast(false);
    };
    const handleErrorToast = () => {
        setOpenErrorToast(false);
    };

    useEffect(() => {
        setHandleToast(false);
        dispatch(customersWithAccountsAction());
        // dispatch(getLatestModifiedDetails());
    }, []);

    return (
        <div>
            <MainCard title={<div className="title">Transaction</div>}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MaterialTable
                                    title={`Last Modified Date `}
                                    columns={columns}
                                    data={tableData}
                                    actions={
                                        [
                                            // {
                                            //     icon: tableIcons.Add,
                                            //     tooltip: 'Add New',
                                            //     isFreeAction: true,
                                            //     onClick: () => handleClickOpen('INSERT', null)
                                            // },
                                            // (rowData) => ({
                                            //     icon: tableIcons.Edit,
                                            //     tooltip: 'Edit',
                                            //     onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                            // }),
                                            // (rowData) => ({
                                            //     icon: tableIcons.VisibilityIcon,
                                            //     tooltip: 'View',
                                            //     onClick: () => handleClickOpen('VIEW', rowData)
                                            // })
                                        ]
                                    }
                                    options={{
                                        padding: 'dense',
                                        showTitle: false,
                                        sorting: true,
                                        search: true,
                                        searchFieldAlignment: 'right',
                                        searchAutoFocus: true,
                                        searchFieldVariant: 'standard',
                                        filtering: true,
                                        paging: true,
                                        pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                                        pageSize: 10,
                                        paginationType: 'stepped',
                                        showFirstLastPageButtons: false,
                                        exportButton: false,
                                        exportAllData: true,
                                        exportFileName: 'TableData',
                                        actionsColumnIndex: -1,
                                        columnsButton: true,

                                        headerStyle: {
                                            whiteSpace: 'nowrap',
                                            height: 30,
                                            maxHeight: 30,
                                            padding: 2,
                                            fontSize: '14px',
                                            backgroundColor: '#2196F3',
                                            background: '-ms-linear-gradient(top, #0790E8, #3180e6)',
                                            background: '-webkit-linear-gradient(top, #0790E8, #3180e6)',
                                            textAlign: 'center',
                                            color: '#FFF',
                                            textAlign: 'center'
                                        },
                                        rowStyle: {
                                            whiteSpace: 'nowrap',
                                            height: 20,
                                            align: 'left',
                                            // maxHeight: 20,
                                            fontSize: '13px',
                                            padding: 0
                                        }
                                    }}
                                />

                                {openWithdrwal ? (
                                    <Withdrawal
                                        open={openWithdrwal}
                                        handleClose={handleClose}
                                        code={code}
                                        mode={mode}
                                        type={type}
                                        storeData={storeData}
                                    />
                                ) : (
                                    ''
                                )}
                                {openDeposit ? (
                                    <Deposit
                                        open={openDeposit}
                                        handleClose={handleClose}
                                        code={code}
                                        mode={mode}
                                        type={type}
                                        storeData={storeData}
                                    />
                                ) : (
                                    ''
                                )}
                                {openStatement ? (
                                    <BankStatement
                                        open={openStatement}
                                        handleClose={handleClose}
                                        code={code}
                                        mode={mode}
                                        type={type}
                                        storeData={storeData}
                                    />
                                ) : (
                                    ''
                                )}
                                {openMoneyTransfer ? (
                                    <TransferMoney
                                        open={openMoneyTransfer}
                                        handleClose={handleClose}
                                        code={code}
                                        mode={mode}
                                        type={type}
                                        storeData={storeData}
                                    />
                                ) : (
                                    ''
                                )}
                                {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
                                {openErrorToast ? (
                                    <ErrorMsg openToast={openErrorToast} handleToast={setOpenErrorToast} mode={mode} />
                                ) : null}
                            </Grid>
                        </Grid>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
}

export default ViewOnlinebanking;
