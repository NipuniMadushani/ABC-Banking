import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'utils/MaterialTableIcons';
import BankAccount from './BankAccount';
import SuccessMsg from '../../../../messages/SuccessMsg';
import ErrorMsg from '../../../../messages/ErrorMsg';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { FormControlLabel, FormGroup, Switch, Button } from '@mui/material';
import { getAllBankAccounts } from '../../../../store/actions/masterActions/BankAccountActions';
function ViewBankAccount() {
    const [open, setOpen] = useState(false);
    const [taxGroupCode, setTaxGroupCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const [openAccount, setOpenAccount] = useState(false);
    const [roleMode, setRoleMode] = useState(false);

    const columns = [
        {
            title: 'Account No',
            field: 'accountNo',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'User',
            field: 'user.userName',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'Branch',
            field: 'branch.bankName',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'Available Balance',
            field: 'availableBalance',
            filterPlaceholder: 'filter',
            align: 'center'
        },

        {
            title: 'Created Date',
            field: 'createdDate',
            align: 'left',
            grouping: false,
            filterPlaceholder: 'filter'
        },

        {
            title: 'Status',
            field: 'status',
            align: 'center',
            lookup: {
                true: 'Active',
                false: 'Inactive'
            },
            render: (rowData) => (
                <div
                    style={{
                        alignItems: 'center',
                        align: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {rowData.status === true ? (
                        <FormGroup>
                            <FormControlLabel control={<Switch color="success" size="small" />} checked={true} />
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <FormControlLabel control={<Switch color="error" size="small" />} checked={false} />
                        </FormGroup>
                    )}
                </div>
            )
        }
        // {
        //     title: 'Statement',
        //     field: 'intermediaryBank',
        //     align: 'right',
        //     grouping: false,
        //     filterPlaceholder: 'filter'
        // },
        // {
        //     title: 'view acc',
        //     render: (rowData) => (
        //         <Button variant="outlined" type="button" onClick={() => handleButtonClick('account', rowData)}>
        //             Account
        //         </Button>
        //     ),
        //     align: 'center'
        // }
    ];

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

    const handleButtonClick = (type, rowData) => {
        // Add your button click logic here
        console.log('Button clicked for:', rowData);
        if (type == 'account') {
            setOpenAccount(true);
        }
    };

    const handleCloseBankAccount = () => {
        setOpenAccount(false);
    };

    const handleCloseSubmit = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const error = useSelector((state) => state.bankAcccountReducer.errorMsg);

    const bankAccountList = useSelector((state) => state.bankAcccountReducer.bankAccountList);
    const bankAccount = useSelector((state) => state.bankAcccountReducer.bankAccount);

    const lastModifiedDate = useSelector((state) => state.bankAcccountReducer.lastModifiedDateTime);

    useEffect(() => {
        console.log(error);
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        console.log(bankAccount);
        if (bankAccount) {
            console.log('sucessToast');
            setHandleToast(true);
            // dispatch(getAllTaxGroupDetails());
            // dispatch(getLatestModifiedTaxGroupDetails());
        }
    }, [bankAccount]);

    useEffect(() => {
        if (bankAccountList) {
            if (logUserData.roles == 'ADMIN' || logUserData.roles == 'MANAGER') {
                setTableData(bankAccountList);
            } else if (logUserData.roles == 'CUSTOMER') {
                console.warn(logUserData.userName);
                console.warn(bankAccountList);
                let account = bankAccountList.filter((data) => logUserData.userName == data.user.userName);
                console.warn(account);
                setTableData(account);
            }
        }
    }, [bankAccountList]);

    useEffect(() => {
        setLastModifiedTimeDate(
            lastModifiedDate === null
                ? ''
                : new Date(lastModifiedDate).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                  })
        );
    }, [lastModifiedDate]);

    const handleClickOpen = (type, data) => {
        console.log(type);
        console.log(data);
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setTaxGroupCode(data.taxGroupCode);
        } else if (type === 'INSERT') {
            setTaxGroupCode('');
            setMode(type);
        } else {
            setMode(type);
            setTaxGroupCode(data.taxGroupCode);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToast = () => {
        setHandleToast(false);
    };
    const handleErrorToast = () => {
        setOpenErrorToast(false);
    };

    useEffect(() => {
        setHandleToast(false);
        dispatch(getAllBankAccounts());
        // dispatch(getAllTaxData());
        // dispatch(getLatestModifiedTaxGroupDetails());
    }, []);

    return (
        <div>
            <MainCard title={<div className="title">Bank Accounts</div>}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MaterialTable
                                    title={`Last Modified Date : ${lastModifiedTimeDate}`}
                                    columns={columns}
                                    data={tableData}
                                    // actions={[
                                    //     {
                                    //         icon: tableIcons.Add,
                                    //         tooltip: 'Add New',
                                    //         isFreeAction: true,
                                    //         onClick: () => handleClickOpen('INSERT', null)
                                    //     },
                                    //     (rowData) => ({
                                    //         icon: tableIcons.Edit,
                                    //         tooltip: 'Edit',
                                    //         onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                    //     }),
                                    //     (rowData) => ({
                                    //         icon: tableIcons.VisibilityIcon,
                                    //         tooltip: 'View',
                                    //         onClick: () => handleClickOpen('VIEW', rowData)
                                    //     })
                                    // ]}
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
                                        exportButton: true,
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
                                            color: '#FFF'
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

                                {/* {open ? <TaxGroup open={open} handleClose={handleClose} taxGroupCode={taxGroupCode} mode={mode} /> : ''} */}
                                {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
                                {openErrorToast ? (
                                    <ErrorMsg openToast={openErrorToast} handleToast={setOpenErrorToast} mode={mode} />
                                ) : null}
                                {openAccount ? (
                                    <BankAccount
                                        open={openAccount}
                                        handleClose={handleCloseBankAccount}
                                        userCode={userCode}
                                        mode={mode}
                                        component="user_creation"
                                        handleCloseSubmit={handleCloseSubmit}
                                    />
                                ) : (
                                    ''
                                )}
                            </Grid>
                        </Grid>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
}

export default ViewBankAccount;
