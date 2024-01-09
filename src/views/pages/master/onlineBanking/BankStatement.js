import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, FormControlLabel, Box, DialogContent, TextField, DialogTitle, FormGroup, Button, MenuItem, Switch } from '@mui/material';
import MaterialTable from 'material-table';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    saveDepartmentDesignationData,
    getDepartmentDesignationDataById,
    updateDepartmentDesignationData,
    checkDuplicateDepartmentDesignationCode
} from '../../../../store/actions/masterActions/DepartmentDesignationAction';
import tableIcons from 'utils/MaterialTableIcons';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import CreatedUpdatedUserDetailsWithTableFormat from '../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';

function BankStatement({ open, handleClose, mode, code, type }) {
    const initialValues = {
        type: '',
        description: '',
        status: true
    };

    const [loadValues, setLoadValues] = useState(null);
    const [tableData, setTableData] = useState([]);
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
            title: 'Role',
            field: 'roles',
            filterPlaceholder: 'filter',
            align: 'left'
        },
        {
            title: 'Withdrwal2',
            render: (rowData) => (
                <Button variant="outlined" type="button" onClick={() => handleButtonClick('Withdrawal', rowData)}>
                    Withdraw
                </Button>
            ),
            align: 'center'
        },

        {
            title: 'Withdrwal24',
            render: (rowData) => (
                <Button variant="outlined" type="button" onClick={() => handleButtonClick('Deposit', rowData)}>
                    Deposit
                </Button>
            ),
            align: 'center'
        },
        {
            title: 'Withdrw4al2',
            render: (rowData) => (
                <Button variant="outlined" type="button" onClick={() => handleButtonClick('statement', rowData)}>
                    Download Statement
                </Button>
            ),
            align: 'center'
        }
    ];

    const validationSchema = yup.object().shape({
        accno: yup.string().required('Required field')
    });

    const customersWithAccounts = useSelector((state) => state.userReducer.customersWithAccounts);

    //get data from reducers...
    const departmentDesignationToUpdate = useSelector((state) => state.departmentDesignationReducer.departmentDesignationToUpdate);
    const duplicateDepartmentDesignation = useSelector((state) => state.departmentDesignationReducer.duplicateDepartmentDesignation);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(customersWithAccounts);

        if (customersWithAccounts) {
            console.log(customersWithAccounts);
            setTableData(customersWithAccounts);
        }
    }, [customersWithAccounts]);

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getDepartmentDesignationDataById(code, type));
        }
    }, [mode]);

    useEffect(() => {
        if (
            (mode === 'VIEW_UPDATE' && departmentDesignationToUpdate != null) ||
            (mode === 'VIEW' && departmentDesignationToUpdate != null)
        ) {
            setLoadValues(departmentDesignationToUpdate);
        }
    }, [departmentDesignationToUpdate]);

    const handleSubmitForm = (data) => {
        if (mode === 'INSERT') {
            dispatch(saveDepartmentDesignationData(data));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateDepartmentDesignationData(data));
        }
        handleClose();
    };

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
                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
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
                                                        {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <MaterialTable
                                            title={`Last Modified Date : `}
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
                                        <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                            {mode != 'VIEW' ? (
                                                <Button
                                                    variant="outlined"
                                                    type="button"
                                                    style={{
                                                        // backgroundColor: '#B22222',
                                                        marginLeft: '10px'
                                                    }}
                                                    onClick={(e) => resetForm()}
                                                >
                                                    CLEAR
                                                </Button>
                                            ) : (
                                                ''
                                            )}

                                            {mode != 'VIEW' ? (
                                                <Button className="btnSave" variant="contained" type="submit">
                                                    Submit
                                                </Button>
                                            ) : (
                                                ''
                                            )}
                                        </Box>
                                        <Box>
                                            <Grid item>
                                                {mode === 'VIEW' ? <CreatedUpdatedUserDetailsWithTableFormat formValues={values} /> : null}
                                            </Grid>
                                        </Box>
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
