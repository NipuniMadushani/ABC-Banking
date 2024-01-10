import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, FormControlLabel, Box, DialogContent, TextField, DialogTitle, FormGroup, Button, MenuItem, Switch } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    saveDepartmentDesignationData,
    getDepartmentDesignationDataById,
    updateDepartmentDesignationData,
    checkDuplicateDepartmentDesignationCode
} from '../../../../store/actions/masterActions/DepartmentDesignationAction';

import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import CreatedUpdatedUserDetailsWithTableFormat from '../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';

import { depositAmount, withdrawAmount, getBankStatement } from '../../../../store/actions/masterActions/TransactionAction';
function Deposit({ open, handleClose, mode, code, type, storeData }) {
    const initialValues = {
        transactionAmount: '',
        transactionId: '',
        type: 'cr',
        currentAmount: '',
        accountNo: '',
        modifiedBy: '',
        date: new Date()
    };

    const [loadValues, setLoadValues] = useState(null);

    const validationSchema = yup.object().shape({
        transactionAmount: yup.number().required('Required field')
    });

    //get data from reducers...
    const departmentDesignationToUpdate = useSelector((state) => state.departmentDesignationReducer.departmentDesignationToUpdate);

    const dispatch = useDispatch();

    useEffect(() => {
        if (storeData) {
            console.log(storeData);
            let initialValues = {
                transactionAmount: '',
                transactionId: null,
                type: 'cr',
                currentAmount: storeData.currentBalance,
                accountNo: storeData.accountNo,
                modifiedBy: '',
                date: new Date()
            };

            setLoadValues(initialValues);
        }
    }, [storeData]);

    useEffect(() => {
        if (
            (mode === 'VIEW_UPDATE' && departmentDesignationToUpdate != null) ||
            (mode === 'VIEW' && departmentDesignationToUpdate != null)
        ) {
            setLoadValues(departmentDesignationToUpdate);
        }
    }, [departmentDesignationToUpdate]);

    const handleSubmitForm = (data) => {
        console.log(data);
        if (mode === 'INSERT') {
            dispatch(depositAmount(data));
        } else if (mode === 'VIEW_UPDATE') {
        }
        handleClose();
    };

    return (
        <div>
            <Dialog fullWidth open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>Deposit</Box>
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
                                            <Grid container rowSpacing={2} style={{ marginTop: '2px' }}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 250 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Amount to Deposit"
                                                        name="transactionAmount"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.transactionAmount}
                                                        error={Boolean(touched.transactionAmount && errors.transactionAmount)}
                                                        helperText={
                                                            touched.transactionAmount && errors.transactionAmount
                                                                ? errors.transactionAmount
                                                                : ''
                                                        }
                                                    ></TextField>
                                                </Grid>
                                            </Grid>
                                        </Box>
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
                                                    {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
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

export default Deposit;
