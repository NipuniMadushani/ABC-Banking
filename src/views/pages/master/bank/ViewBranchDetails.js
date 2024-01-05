import { FormControlLabel, FormGroup, Grid, Switch, Paper, Button } from '@mui/material';
import MaterialTable, { MTableToolbar } from 'material-table';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import { useEffect, useState } from 'react';

import Bank from './Bank';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTaxData, getLatestModifiedTaxDetails } from 'store/actions/masterActions/TaxActions/TaxAction';
import { getAllBranchData, getLatestModifiedBranchDetails } from 'store/actions/masterActions/BankAction';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';

const ViewBranchDetails = () => {
    const columns = [
        {
            title: 'Branch Name',
            field: 'bankName',
            // filterPlaceholder: 'Bank Name',
            align: 'left'
        },
        {
            title: 'Branch Code',
            field: 'bankCode',
            // filterPlaceholder: 'Branch Code',
            align: 'left'
        },
        {
            title: 'Branch Address',
            field: 'bankAddress',
            // filterPlaceholder: 'Tax Description',
            align: 'left'
        },
        {
            title: 'Branch Description',
            field: 'bankDesc',
            // filterPlaceholder: 'Branch Description',
            align: 'left'
        },
        {
            title: 'Phone',
            field: 'phone',
            // filterPlaceholder: 'Branch Prefix',
            align: 'left'
        },
        {
            title: 'Status',
            field: 'status',
            // filterPlaceholder: "True || False",
            align: 'center',
            lookup: {
                true: 'Active',
                false: 'Inactive'
            },

            // emptyValue: () => <em>null</em>,
            render: (rowData) => (
                <div
                    style={{
                        alignItems: 'center',
                        align: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                        // background: rowData.status === true ? "#008000aa" : "#f90000aa",
                        // borderRadius: "4px",
                        // paddingLeft: 5,
                        // paddingRight: 5,
                    }}
                >
                    {rowData.status === true ? (
                        <FormGroup>
                            <FormControlLabel control={<Switch size="small" color="success" />} checked={true} />
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <FormControlLabel control={<Switch color="error" size="small" />} checked={false} />
                        </FormGroup>
                    )}
                </div>
            )
        }
    ];
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [tableData, setTableData] = useState([]);
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const [openBankDialog, setOpenBankDialog] = useState(false);
    const dispatch = useDispatch();
    const error = useSelector((state) => state.bankReducer.errorMsg);

    const bankData = useSelector((state) => state.bankReducer.bank);

    const branchList = useSelector((state) => state.branchReducer.branches);

    useEffect(() => {
        console.log(branchList);
        if (branchList?.payload?.length > 0) {
            setTableData(branchList?.payload[0]);
        }
    }, [branchList]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleBankClose = () => {
        setOpenBankDialog(false);
    };
    useEffect(() => {
        if (error != null) {
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        if (bankData) {
            setMode('INSERT');
            setHandleToast(true);
            dispatch(getAllBranchData());
        }
    }, [bankData]);

    const handleClickOpen = (type, data) => {
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setId(data.branchId);
            setOpenBankDialog(true);
            // setOpen(true);
        } else if (type === 'INSERT') {
            setId('');
            setMode(type);
            setOpenBankDialog(true);
            // setOpen(true);
        } else {
            setMode(type);
            setId(data.branchId);
            setOpenBankDialog(true);
        }
    };

    const handleToast = () => {
        setHandleToast(false);
    };

    useEffect(() => {
        setHandleToast(false);
        setOpenErrorToast(false);
        dispatch(getAllBranchData());
    }, []);

    return (
        <div>
            <MainCard title={<div className="title">Branch Details</div>}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MaterialTable
                                    // title={`Last Modified Date : ${lastModifiedTimeDate}`}
                                    columns={columns}
                                    data={tableData}
                                    actions={[
                                        {
                                            icon: tableIcons.AccountBalanceIcon,
                                            tooltip: 'Add New Branch',
                                            isFreeAction: true,
                                            onClick: () => handleClickOpen('INSERT', null)
                                        },

                                        (rowData) => ({
                                            // <-- ***NOW A FUNCTION***
                                            icon: tableIcons.Edit,
                                            tooltip: 'Edit ',
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
                                        pageSizeOptions: [5, 10, 20, 50, 100],
                                        pageSize: 10,
                                        paginationType: 'stepped',
                                        showFirstLastPageButtons: false,
                                        exportButton: true,
                                        exportAllData: true,
                                        exportFileName: 'Branch Details',
                                        actionsColumnIndex: -1,
                                        columnsButton: true,
                                        color: 'primary',

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

                                {openBankDialog ? <Bank open={openBankDialog} handleClose={handleBankClose} id={id} mode={mode} /> : ''}

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
};

export default ViewBranchDetails;
