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
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

function ViewBankAccount() {
    const [open, setOpen] = useState(false);
    const [taxGroupCode, setTaxGroupCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const [openAccount, setOpenAccount] = useState(false);

    const columns = [
        {
            title: 'Customer Name',
            field: 'bank.bankName',
            filterPlaceholder: 'filter',
            align: 'left'
        },

        {
            title: 'Bank Branch',
            field: 'companyName',
            filterPlaceholder: 'filter',
            align: 'left'
        },
        {
            title: 'Account Number',
            field: 'accountNumber',
            align: 'left',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'Ifs  Code',
            field: 'accountDesc',
            align: 'left',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'Account Type',
            field: 'intermediaryBank',
            align: 'right',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'Complete Detail',
            field: 'intermediaryBank',
            align: 'right',
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
        },
        {
            title: 'Statement',
            field: 'intermediaryBank',
            align: 'right',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'view acc',
            render: (rowData) => (
                <Button variant="outlined" type="button" onClick={() => handleButtonClick('account', rowData)}>
                    Account
                </Button>
            ),
            align: 'center'
        }
    ];

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

    const taxGroupListData = useSelector((state) => state.bankAcccountReducer.taxgroups);
    const bankAccount = useSelector((state) => state.bankAcccountReducer.bankAccount);
    console.log(taxGroupListData);
    const lastModifiedDate = useSelector((state) => state.bankAcccountReducer.lastModifiedDateTime);

    useEffect(() => {
        if (taxGroupListData?.payload?.length > 0) {
            setTableData(taxGroupListData?.payload[0]);
        }
    }, [taxGroupListData]);

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
        // dispatch(getAllTaxGroupDetails());
        // dispatch(getAllTaxData());
        // dispatch(getLatestModifiedTaxGroupDetails());
    }, []);

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
    return (
        <div>
            <MainCard title="Bank Accounts">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MaterialTable
                                    title={`Last Modified Date : ${lastModifiedTimeDate}`}
                                    columns={columns}
                                    data={tableData}
                                    actions={[
                                        {
                                            icon: tableIcons.Add,
                                            tooltip: 'Add New',
                                            isFreeAction: true,
                                            onClick: () => handleClickOpen('INSERT', null)
                                        },
                                        (rowData) => ({
                                            icon: tableIcons.Edit,
                                            tooltip: 'Edit',
                                            onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'View',
                                            onClick: () => handleClickOpen('VIEW', rowData)
                                        })
                                    ]}
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
