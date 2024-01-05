import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Box, DialogContent, TextField, DialogTitle, Button, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    saveTaxGroupData,
    getTaxGroupDataById,
    updateTaxGroupData,
    checkDuplicateTaxGroupCode
} from '../../../../store/actions/masterActions/TaxActions/TaxGroupAction';

import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import { getAllTaxData } from '../../../../store/actions/masterActions/TaxActions/TaxAction';

function BankAccount({ open, handleClose, mode, taxGroupCode }) {
    const initialValues = {
        taxGroupType: '',
        taxGroupCode: '',
        description: '',
        taxGroupDetails: [
            {
                tax: null,
                taxOrder: '',
                // onOriginal: '',
                status: true
            }
        ]
    };

    const [taxListOptions, setTaxListOptions] = useState([]);
    const [loadValues, setLoadValues] = useState(null);
    const [openDialogBox, setOpenDialogBox] = useState(false);

    yup.addMethod(yup.array, 'uniqueTaxOrder', function (message) {
        return this.test('uniqueTaxOrder', message, function (list) {
            const mapper = (x) => {
                return x.taxOrder;
            };
            const set = [...new Set(list.map(mapper))];
            const isUnique = list.length === set.length;
            if (isUnique) {
                return true;
            }

            const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
            return this.createError({
                path: `taxGroupDetails[${idx}].taxOrder`,
                message: message
            });
        });
    });

    yup.addMethod(yup.array, 'uniqueTaxCode', function (message) {
        return this.test('uniqueTaxCode', message, function (list) {
            const mapper = (x) => {
                return x.tax?.taxCode;
            };
            const set = [...new Set(list.map(mapper))];
            const isUnique = list.length === set.length;
            if (isUnique) {
                return true;
            }

            const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
            return this.createError({
                path: `taxGroupDetails[${idx}].tax`,
                message: message
            });
        });
    });

    yup.addMethod(yup.string, 'checkDuplicateTaxGroup', function (message) {
        return this.test('checkDuplicateTaxGroup', message, async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    await dispatch(checkDuplicateTaxGroupCode(value));

                    if (duplicateTaxGroup != null && duplicateTaxGroup.errorMessages.length != 0) {
                        return false;
                    } else {
                        return true;
                    }
                    return false; // or true as you see fit
                } catch (error) {}
            }
            return true;
        });
    });

    const validationSchema = yup.object().shape({
        taxGroupType: yup.string().required('Required field'),
        taxGroupCode: yup.string().required('Required field').checkDuplicateTaxGroup('Duplicate Code'),
        description: yup.string().required('Required field'),

        taxGroupDetails: yup
            .array()
            .of(
                yup.object().shape({
                    tax: yup.object().typeError('Required field'),
                    taxOrder: yup.number().positive('Must be greater than zero')
                    // onOriginal: yup.string().required('Required field')
                })
            )
            .uniqueTaxOrder('Must be unique')
            .uniqueTaxCode('Must be unique')
    });

    const taxGroupToUpdate = useSelector((state) => state.taxGroupReducer.taxGroupToUpdate);
    const taxListData = useSelector((state) => state.taxReducer.taxes);
    const duplicateTaxGroup = useSelector((state) => state.taxGroupReducer.duplicateTaxGroup);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('update');
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            console.log(taxGroupCode);
            dispatch(getTaxGroupDataById(taxGroupCode));
        }
    }, [mode]);

    useEffect(() => {
        if (taxListData != null) {
            setTaxListOptions(taxListData);
        }
    }, [taxListData]);

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
        console.log(data);
        let arry = [];
        data.taxGroupDetails.map((data) => {
            arry.push(+data.taxOrder);
        });
        const result = checkValidArray(arry);
        console.log(result);
        if (result === true) {
            setOpenDialogBox(false);
            if (mode === 'INSERT') {
                dispatch(saveTaxGroupData(data));
            } else if (mode === 'VIEW_UPDATE') {
                console.log('yes click');
                dispatch(updateTaxGroupData(data));
            }
            handleClose();
        } else {
            setOpenDialogBox(true);
        }
    };

    useEffect(() => {
        dispatch(getAllTaxData());
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
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}User
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
                                                                            name="taxGroupCode"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.taxGroupCode}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.taxGroupCode && errors.taxGroupCode)}
                                                                            helperText={
                                                                                touched.taxGroupCode && errors.taxGroupCode
                                                                                    ? errors.taxGroupCode
                                                                                    : ''
                                                                            }
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
                                                                            name="description"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.description}
                                                                            error={Boolean(touched.description && errors.description)}
                                                                            helperText={
                                                                                touched.description && errors.description
                                                                                    ? errors.description
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
                                                                            name="taxGroupType"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.taxGroupType}
                                                                            error={Boolean(touched.taxGroupType && errors.taxGroupType)}
                                                                            helperText={
                                                                                touched.taxGroupType && errors.taxGroupType
                                                                                    ? errors.taxGroupType
                                                                                    : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                            label="Customer"
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            type="text"
                                                                            variant="outlined"
                                                                            name="taxGroupCode"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.taxGroupCode}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.taxGroupCode && errors.taxGroupCode)}
                                                                            helperText={
                                                                                touched.taxGroupCode && errors.taxGroupCode
                                                                                    ? errors.taxGroupCode
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '15px' }}>
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
                                                                            label="Customer Contact"
                                                                            name="description"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.description}
                                                                            error={Boolean(touched.description && errors.description)}
                                                                            helperText={
                                                                                touched.description && errors.description
                                                                                    ? errors.description
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                            label="IFSC Code"
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            type="text"
                                                                            variant="outlined"
                                                                            name="taxGroupCode"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.taxGroupCode}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.taxGroupCode && errors.taxGroupCode)}
                                                                            helperText={
                                                                                touched.taxGroupCode && errors.taxGroupCode
                                                                                    ? errors.taxGroupCode
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    </Grid>
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
                                                                            select
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            label="Account Type"
                                                                            name="taxGroupType"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.taxGroupType}
                                                                            error={Boolean(touched.taxGroupType && errors.taxGroupType)}
                                                                            helperText={
                                                                                touched.taxGroupType && errors.taxGroupType
                                                                                    ? errors.taxGroupType
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            <MenuItem dense={true} value={'Sell'}>
                                                                                Saving
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'Buy'}>
                                                                                Current
                                                                            </MenuItem>
                                                                        </TextField>
                                                                    </Grid>
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
