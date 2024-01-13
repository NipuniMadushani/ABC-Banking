import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, FormControlLabel, Box, DialogContent, TextField, DialogTitle, Chip, Button, MenuItem, Switch } from '@mui/material';
import MaterialTable from 'material-table';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import tableIcons from 'utils/MaterialTableIcons';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import CreatedUpdatedUserDetailsWithTableFormat from '../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';
import { getBankStatement } from '../../../../store/actions/masterActions/TransactionAction';

function BankStatement({ open, handleClose, mode, code, type, storeData }) {
    const initialValues = {
        accountNo: ''
    };

    const [loadValues, setLoadValues] = useState(null);
    const [tableData, setTableData] = useState([]);
    const columns = [
        {
            title: 'Date',
            field: 'date',
            filterPlaceholder: 'YYYY-MM-DD',
            align: 'left',
            render: (rowData) => (
                <div>
                    {new Date(rowData.date).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    })}
                </div>
            )
        },
        {
            title: 'Current Amount',
            field: 'currentAmount',
            filterPlaceholder: 'filter',
            align: 'left'
        },
        {
            title: 'Transaction Amount',
            field: 'transactionAmount',
            filterPlaceholder: 'filter',
            align: 'left'
        },
        {
            title: 'Credit/Debit',
            field: 'type',
            filterPlaceholder: 'CR/DR',
            align: 'left',
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
                    {rowData.type === 'CR' ? (
                        <Chip
                            size="small"
                            label="CREDIT"
                            sx={{
                                color: '#ffffff',
                                bgcolor: '#00b300'
                            }}
                        />
                    ) : rowData.type === 'DR' ? (
                        <Chip
                            size="small"
                            label="DEBIT"
                            sx={{
                                color: '#ffffff',
                                bgcolor: '#005ce6'
                            }}
                        />
                    ) : (
                        <Chip
                            size="small"
                            label="TRANSFER"
                            sx={{
                                color: '#ffffff',
                                bgcolor: '#e64d00'
                            }}
                        />
                    )}
                </div>
            )
        }
    ];

    const validationSchema = yup.object().shape({
        accountNo: yup.string().required('Required field')
    });

    //get data from reducers...
    const bankStatemetList = useSelector((state) => state.transactionReducer.bankStatemetList);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(bankStatemetList);

        if (bankStatemetList) {
            console.log(bankStatemetList);
            setTableData(bankStatemetList);
        }
    }, [bankStatemetList]);

    const handleSubmitForm = (data) => {
        if (mode === 'INSERT') {
            dispatch(getBankStatement(data.accountNo));
        }
        // handleClose();
    };

    useEffect(() => {
        if (storeData) {
            setLoadValues(storeData);
        }
    }, [storeData]);

    useEffect(() => {
        setTableData([]);
    }, []);
    return (
        <div>
            <Dialog
                fullWidth
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="200px"
            >
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}
                            Bank Statement
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <>
                    <DialogContent>
                        <Formik
                            maxWidth
                            enableReinitialize={true}
                            initialValues={loadValues || initialValues}
                            onSubmit={(values, resetForm) => {
                                handleSubmitForm(values);
                                // resetForm('');
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm }) => {
                                return (
                                    <Form>
                                        <Box sx={{ width: '100%' }}>
                                            <Grid container rowSpacing={2} style={{ marginTop: '2px', marginBottom: '20px' }}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        disabled
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Account No"
                                                        name="accountNo"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.accountNo}
                                                        error={Boolean(touched.accountNo && errors.accountNo)}
                                                        helperText={touched.accountNo && errors.accountNo ? errors.accountNo : ''}
                                                    ></TextField>

                                                    <Button
                                                        className="btnSave"
                                                        variant="contained"
                                                        type="submit"
                                                        style={{ marginLeft: '20px' }}
                                                    >
                                                        {mode === 'INSERT' ? 'SEARCH' : 'UPDATE'}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <MaterialTable
                                            title={`Last Modified Date : `}
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
                                                exportButton: true,
                                                exportAllData: true,
                                                exportFileName: 'Bank Statement',
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
                                    </Form>
                                );
                            }}
                        </Formik>
                    </DialogContent>
                </>
            </Dialog>
        </div>
    );
}

export default BankStatement;
