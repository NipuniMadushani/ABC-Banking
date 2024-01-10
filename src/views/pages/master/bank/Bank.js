import { useEffect, forwardRef, useState, useMemo } from 'react';

import {
    Dialog,
    Box,
    DialogContent,
    TextField,
    DialogTitle,
    Button,
    Grid,
    Autocomplete,
    FormGroup,
    FormControlLabel,
    Switch
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'assets/scss/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { checkDuplicateTaxCode, getTaxDataById, saveTaxData, updateTaxData } from 'store/actions/masterActions/TaxAction';
import { getAllActiveBrnachManagers, getBranchDataById, saveBankData } from 'store/actions/masterActions/BankAction';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { gridSpacing } from 'store/constant';
import countryList from 'react-select-country-list';
import { currencies } from './Currency';

function Bank({ open, handleClose, mode, id }) {
    const initialValues = {
        branchId: '',
        bankCode: '',
        bankName: '',
        bankAddress: '',
        bankDesc: '',
        website: '',
        email: '',
        phone: '',
        currency: null,
        country: '',
        branchManager: null,
        status: true
    };
    const options = useMemo(() => countryList().getData(), []);
    const dispatch = useDispatch();
    const [currencyListArray, setCurrecyListArray] = useState([]);
    const [activeBranchManagersList, setActiveBranchManagersList] = useState([]);

    const [loadValues, setLoadValues] = useState(null);
    const branchManagerList = useSelector((state) => state.bankReducer.branchManagerList);

    const branchToUpdate = useSelector((state) => state.branchReducer.branchToUpdate);

    const validationSchema = yup.object().shape({
        bankCode: yup.string().required('Required field'),
        bankName: yup.string().required('Required field'),
        bankAddress: yup.string().required('Required field'),
        branchManager: yup.object().required('Required field'),
        email: yup.string().email(),
        phone: yup.string().max(25, 'Must be 25 digits'),
        website: yup
            .string()
            .nullable()
            .matches(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/, 'Please enter a valid website')
            .max(100, 'Website must be no more than 100 characters')
    });

    useEffect(() => {
        if (currencies.length != 0) {
            let array = [];

            for (let [key, value] of Object.entries(currencies.currencies)) {
                array.push({ name: key, value: value });
            }
            setCurrecyListArray(array);
        }
    }, [currencies]);

    const handleSubmitForm = (data) => {
        dispatch(saveBankData(data));

        handleClose();
    };
    useEffect(() => {
        dispatch(getAllActiveBrnachManagers());
    }, []);

    useEffect(() => {
        if (id != null || id != '') {
            dispatch(getBranchDataById(id));
        }
    }, [id]);

    useEffect(() => {
        if (branchToUpdate != null) {
            setLoadValues(branchToUpdate);
        }
    }, [branchToUpdate]);

    useEffect(() => {
        if (branchManagerList?.length > 0) {
            setActiveBranchManagersList(branchManagerList);
        }
    }, [branchManagerList]);

    return (
        <div>
            <Dialog
                PaperProps={{
                    style: { borderRadius: 15 }
                }}
                open={open}
                keepMounted
                maxWidth="100%"
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'BANK' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update ' : ''} {mode === 'VIEW' ? 'View ' : ''}Branch
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <div>
                        <Formik
                            enableReinitialize={true}
                            initialValues={loadValues || initialValues}
                            onSubmit={(values) => {
                                handleSubmitForm(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm, dirty }) => {
                                return (
                                    <Form>
                                        <Box sx={{ width: '100%' }}>
                                            <Grid container rowSpacing={2} spacing={gridSpacing} style={{ marginTop: '2px' }}>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        disabled={mode == 'VIEW'}
                                                        label="Branch Code"
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        sx={{
                                                            width: { xs: 150, sm: 250 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        type="text"
                                                        variant="outlined"
                                                        id="bankCode"
                                                        name="bankCode"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.bankCode}
                                                        error={Boolean(touched.bankCode && errors.bankCode)}
                                                        helperText={touched.bankCode && errors.bankCode ? errors.bankCode : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        disabled={mode == 'VIEW'}
                                                        label="Branch Name"
                                                        sx={{
                                                            width: { xs: 150, sm: 250 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        // label={taxDescription}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        className="required"
                                                        type="text"
                                                        variant="outlined"
                                                        id="bankName"
                                                        name="bankName"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.bankName}
                                                        error={Boolean(touched.bankName && errors.bankName)}
                                                        helperText={touched.bankName && errors.bankName ? errors.bankName : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        disabled={mode == 'VIEW'}
                                                        label="Branch Address"
                                                        sx={{
                                                            width: { xs: 150, sm: 250 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        name="bankAddress"
                                                        type="text"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.bankAddress}
                                                        error={Boolean(touched.bankAddress && errors.bankAddress)}
                                                        helperText={touched.bankAddress && errors.bankAddress ? errors.bankAddress : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Autocomplete
                                                        fullWidth
                                                        name="branchManager"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`branchManager`, value);
                                                        }}
                                                        disabled={mode == 'VIEW'}
                                                        value={values.branchManager}
                                                        options={activeBranchManagersList}
                                                        getOptionLabel={(option) => `${option.firstName} - (${option.lastName})`}
                                                        isOptionEqualToValue={(option, value) => option.userId === value.userId}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Branch Manager"
                                                                sx={{
                                                                    width: { sm: 620, md: 200 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                variant="outlined"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                name="branchManager"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>{' '}
                                            </Grid>
                                            <Grid container rowSpacing={2} spacing={gridSpacing} style={{ marginTop: '2px' }}>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        disabled={mode == 'VIEW'}
                                                        label="Branch Description"
                                                        sx={{
                                                            width: { xs: 150, sm: 250 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        className="required"
                                                        type="text"
                                                        variant="outlined"
                                                        id="bankDesc"
                                                        name="bankDesc"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.bankDesc}
                                                        error={Boolean(touched.bankDesc && errors.bankDesc)}
                                                        helperText={touched.bankDesc && errors.bankDesc ? errors.bankDesc : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        disabled={mode == 'VIEW'}
                                                        label="Branch Email"
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        sx={{
                                                            width: { xs: 150, sm: 250 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        type="text"
                                                        variant="outlined"
                                                        name="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        error={Boolean(touched.email && errors.email)}
                                                        helperText={touched.email && errors.email ? errors.email : ''}
                                                    />
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <TextField
                                                        disabled={mode == 'VIEW'}
                                                        label="Phone No"
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        sx={{
                                                            width: { xs: 150, sm: 250 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        type="text"
                                                        variant="outlined"
                                                        name="phone"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone}
                                                        error={Boolean(touched.phone && errors.phone)}
                                                        helperText={touched.phone && errors.phone ? errors.phone : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Autocomplete
                                                        value={values.country}
                                                        name="country"
                                                        onChange={(_, value) => {
                                                            console.log(values.label);
                                                            setFieldValue(`country`, value.label);
                                                        }}
                                                        disabled={mode == 'VIEW'}
                                                        options={options}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Country"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                sx={{
                                                                    width: { sm: 200 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 41
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW'}
                                                                variant="outlined"
                                                                name="country"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container rowSpacing={2} spacing={gridSpacing} style={{ marginTop: '2px' }}>
                                                <Grid item xs={3}>
                                                    <Autocomplete
                                                        value={values.currency}
                                                        name="currency"
                                                        onChange={(event, value) => {
                                                            setFieldValue('currency', value); // Ensure this line is correct
                                                        }}
                                                        disabled={mode == 'VIEW'}
                                                        // onChange={handleChange}
                                                        options={currencyListArray.map((option) => option.name)}
                                                        // getOptionLabel={(option) => option.name}
                                                        // getOptionLabel={(option) => `${option.guideCode}`}
                                                        // options={currencyListArray}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Currency"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                sx={{
                                                                    width: { sm: 200 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 41
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW'}
                                                                variant="outlined"
                                                                name="currency"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
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
                                            </Grid>
                                        </Box>
                                        <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                            {mode != 'VIEW' ? (
                                                <Button
                                                    variant="outlined"
                                                    type="button"
                                                    disabled={!dirty}
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
                                                <Button className="btnSave" variant="contained" type="submit" disabled={!dirty}>
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
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Bank;
