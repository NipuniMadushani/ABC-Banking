import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Box, DialogContent, TextField, DialogTitle, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import { saveBankAccountData } from '../../../../store/actions/masterActions/BankAccountActions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function BankAccount({ open, handleClose, mode, taxGroupCode, userCode }) {
    const initialValues = {
        accountId: null,
        accountNo: '',
        ifscCode: '',
        type: '',
        status: true,
        userId: '',
        createdBy: '',
        createdDate: new Date(),
        modifiedBy: '',
        modifiedDate: '',
        bank: 'ABC',
        customerContract: '',
        accountBalance: '',
        customer: ''
    };

    const [taxListOptions, setTaxListOptions] = useState([]);
    const [loadValues, setLoadValues] = useState(null);
    const [openDialogBox, setOpenDialogBox] = useState(false);

    const validationSchema = yup.object().shape({});

    const taxGroupToUpdate = useSelector((state) => state.bankAcccountReducer.taxGroupToUpdate);
    const taxListData = useSelector((state) => state.bankAcccountReducer.taxes);
    const duplicateTaxGroup = useSelector((state) => state.bankAcccountReducer.duplicateTaxGroup);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('update');
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            console.log(taxGroupCode);
            // dispatch(getTaxGroupDataById(taxGroupCode));
        }
    }, [mode]);

    useEffect(() => {
        if (userCode != null) {
            let data = {
                accountId: null,
                accountNo: '',
                ifscCode: '',
                type: '',
                status: true,
                userId: userCode.userId,
                createdBy: '',
                createdDate: new Date(),
                modifiedBy: '',
                modifiedDate: '',
                bank: 'ABC',
                customerContract: '',
                accountBalance: '',
                customer: userCode.userName
            };
            setLoadValues(data);
        }
    }, [userCode]);

    useEffect(() => {
        console.log(taxGroupToUpdate);

        if ((mode === 'VIEW_UPDATE' && taxGroupToUpdate != null) || (mode === 'VIEW' && taxGroupToUpdate != null)) {
            setLoadValues(taxGroupToUpdate);
        }
    }, [taxGroupToUpdate]);

    const checkValidArray = (arry) => {
        arry.sort();
        let n = arry.length;

        for (var i = 1; i < n; i++) {
            if (arry[i] != arry[i - 1] + 1) {
                return false;
            }
        }
        return true;
    };
    const handleSubmitForm = (data) => {
        console.warn(data);
        if (mode === 'INSERT') {
            dispatch(saveBankAccountData(data));
        } else if (mode === 'VIEW_UPDATE') {
            console.log('yes click');
            // dispatch(updateTaxGroupData(data));
        }
        handleClose();
    };

    useEffect(() => {
        // dispatch(getAllTaxData());
    }, []);

    const handleCancel = () => {
        setLoadValues(initialValues);
    };
    return (
        <div>
            <Dialog maxWidth="220px" open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}Account
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
                        <div>
                            <div className="row">
                                <Grid container direction="row">
                                    <Grid item lg={12} md={12} xs={12}>
                                        <>
                                            <Formik
                                                enableReinitialize={true}
                                                initialValues={loadValues || initialValues}
                                                onSubmit={(values) => {
                                                    handleSubmitForm(values);
                                                }}
                                                validationSchema={validationSchema}
                                            >
                                                {({ values, handleChange, errors, handleBlur, touched, resetForm }) => {
                                                    return (
                                                        <Form>
                                                            <div style={{ marginTop: '6px', margin: '10px' }}>
                                                                <Grid gap="10px" display="flex">
                                                                    <Grid item>
                                                                        <TextField
                                                                            disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                            label="Bank"
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            type="text"
                                                                            variant="outlined"
                                                                            name="bank"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.bank}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.bank && errors.bank)}
                                                                            helperText={touched.bank && errors.bank ? errors.bank : ''}
                                                                        />
                                                                    </Grid>
                                                                    <Grid>
                                                                        <TextField
                                                                            disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="Bank Account No"
                                                                            name="accountNo"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.accountNo}
                                                                            error={Boolean(touched.accountNo && errors.accountNo)}
                                                                            helperText={
                                                                                touched.accountNo && errors.accountNo
                                                                                    ? errors.accountNo
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '15px' }}>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="standard-select-currency"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            label="IFSC code"
                                                                            name="ifscCode"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.ifscCode}
                                                                            error={Boolean(touched.ifscCode && errors.ifscCode)}
                                                                            helperText={
                                                                                touched.ifscCode && errors.ifscCode ? errors.ifscCode : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            disabled
                                                                            label="Customer"
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            type="text"
                                                                            variant="outlined"
                                                                            name="customer"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.customer}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.customer && errors.customer)}
                                                                            helperText={
                                                                                touched.customer && errors.customer ? errors.customer : ''
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '15px' }}>
                                                                    <Grid item>
                                                                        <TextField
                                                                            disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="standard-select-currency"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            label="Avaliable Balance"
                                                                            name="accountBalance"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.accountBalance}
                                                                            error={Boolean(touched.accountBalance && errors.accountBalance)}
                                                                            helperText={
                                                                                touched.accountBalance && errors.accountBalance
                                                                                    ? errors.accountBalance
                                                                                    : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <LocalizationProvider
                                                                            dateAdapter={AdapterDayjs}
                                                                            // adapterLocale={locale}
                                                                        >
                                                                            <DatePicker
                                                                                disabled={mode != 'INSERT'}
                                                                                onChange={(value) => {
                                                                                    setFieldValue(`createdDate`, value);
                                                                                }}
                                                                                inputFormat="DD/MM/YYYY"
                                                                                value={values.createdDate}
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        sx={{
                                                                                            width: { sm: 200, md: 300 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        InputLabelProps={{
                                                                                            shrink: true
                                                                                        }}
                                                                                        label="To Date"
                                                                                        variant="outlined"
                                                                                        name="createdDate"
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.createdDate && errors.createdDate
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.createdDate && errors.createdDate
                                                                                                ? errors.createdDate
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </LocalizationProvider>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '15px' }}>
                                                                    <FormGroup>
                                                                        <FormControlLabel
                                                                            name="status"
                                                                            disabled={mode === 'VIEW'}
                                                                            // disabled={
                                                                            //     mode == 'VIEW' || component === 'user_profile'
                                                                            //         ? true
                                                                            //         : false
                                                                            // }
                                                                            control={<Switch color="success" />}
                                                                            onChange={handleChange}
                                                                            value={values.status}
                                                                            label="Status"
                                                                            checked={values.status}
                                                                        />
                                                                    </FormGroup>
                                                                </Grid>
                                                            </div>

                                                            <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                                                {mode != 'VIEW' ? (
                                                                    <Button
                                                                        variant="outlined"
                                                                        type="reset"
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
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        </>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                </>
            </Dialog>
        </div>
    );
}

export default BankAccount;
