import { useEffect, forwardRef, useState, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    Slide,
    FormControlLabel,
    Box,
    DialogContent,
    TextField,
    DialogTitle,
    FormGroup,
    Button,
    Typography,
    MenuItem,
    Autocomplete,
    Switch
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, useFormikContext } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import {
    getAllRolesData,
    getUserDataById,
    saveUserData,
    updateUserData,
    getProfileData,
    updateMyProfile
} from 'store/actions/authenticationActions/UserAction';
import CreatedUpdatedUserDetailsWithTableFormat from 'views/pages/master/userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';
import { getAllActiveMarketData } from 'store/actions/masterActions/operatorActions/MarketAction';
import { getAllClusterData } from 'store/actions/masterActions/CodeAndNameAction';
import { getAllCompanyProfileData, getAvailableLicenseCount } from 'store/actions/masterActions/CompanyProfileAction';
import { getAllDepartmentData, getAllDesignationData } from 'store/actions/masterActions/DepartmentDesignationAction';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './../../../../assets/scss/imageUpload.css';

function User({ open, handleClose, mode, userCode, component, handleCloseSubmit }) {
    const initialValues = {
        userId: '',
        // disablePassowrdField: true,
        title: 'MR.',
        firstName: '',
        middleName: '',
        status: true,
        lastName: '',
        nic: '',
        email: '',
        mobile: '',
        roles: 'MANAGER',
        userName: '',
        password: ''
    };
    const [loadValues, setLoadValues] = useState('');
    const [previewImages, setPreviewImages] = useState([]);
    const formikRef = useRef();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        disablePassowrdField: yup.boolean(),
        // company: yup.object().typeError('Required field'),
        // title: yup.string().required('Required field'),
        firstName: yup.string().required('Required field'),
        lastName: yup.string().required('Required field'),
        nic: yup.string().required('Required field'),
        email: yup.string().email().required('Required field'),
        mobile: yup
            .string()
            .required('Required field')
            .matches(phoneRegExp, 'Not valid')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be 10 digits'),
        // designation: yup.object().typeError('Required field'),
        // department: yup.object().typeError('Required field'),
        // cluster: yup.object().typeError('Required field'),
        userName: yup.string().required('Requied field'),
        password: yup.string().max(8).required('Required field')
        // roles: yup
        //     .array()
        //     // .of(yup.object().shape({ roleName: yup.string().required('Required field') }))
        //     // .typeError('Required field')
        //     .required('Required field')

        // password: yup.string().when('disablePassowrdField', {
        //     is: true && mode === 'INSERT' && component === 'user_creation',
        //     then: yup.string().required('Field is required')
        // })
    });

    //get data from reducers
    const duplicateUser = useSelector((state) => state.userReducer.duplicateUser);
    const userToUpdate = useSelector((state) => state.userReducer.userToUpdate);
    const profileToUpdate = useSelector((state) => state.userReducer.profileToUpdate);
    const [marketListOptions, setMarketListOptions] = useState([]);
    const clusterListData = useSelector((state) => state.codeAndNameReducer.cluterTypesDetails);
    const companyProfile = useSelector((state) => state.companyProfileReducer.companyProfileList);
    const availableLicenseCount = useSelector((state) => state.companyProfileReducer.availableLicenseCount);
    const marketListData = useSelector((state) => state.marketReducer.marketActiveList);
    const [clusterListOptions, setClusterListOptions] = useState([]);
    const [departmentListOptions, setDepartmentListOptions] = useState([]);
    const [designationListOptions, setDesignationListOptions] = useState([]);
    const [userListOptions, setuserListOptions] = useState([]);
    const [titleListOptions, setTitleListOptions] = useState([]);
    const [companyListOptions, setCompanyListOptions] = useState([]);
    const [userRoleListOptions, setuserRoleListOptions] = useState([]);
    const [inputMarketValue, setMarketInputValue] = useState(initialValues.markets);
    const departmentActiveList = useSelector((state) => state.departmentDesignationReducer.departmentActiveList);
    const designationActiveList = useSelector((state) => state.departmentDesignationReducer.designationActiveList);
    const roleIdList = useSelector((state) => state.userReducer.userRole);
    const myProfileUpdate = useSelector((state) => state.userReducer.myProfileUpdate);

    const dispatch = useDispatch();
    const titleItems = [
        {
            title: 'Mr.'
        },
        {
            title: 'Mrs.'
        },
        {
            title: 'Miss.'
        },
        {
            title: 'Ms.'
        },
        {
            title: 'Prof.'
        },
        {
            title: 'Dr.'
        },
        {
            title: 'Ven.'
        }
    ];
    useEffect(() => {
        if (clusterListData != null) {
            setClusterListOptions(clusterListData);
        }
    }, [clusterListData]);

    useEffect(() => {
        if (departmentActiveList != null) {
            setDepartmentListOptions(departmentActiveList);
        }
    }, [departmentActiveList]);

    useEffect(() => {
        console.warn(userToUpdate);
        if ((mode === 'VIEW_UPDATE' && userToUpdate != null) || (mode === 'VIEW' && userToUpdate != null)) {
            setLoadValues(userToUpdate?.body?.payload[0]);
        }
    }, [userToUpdate]);

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && profileToUpdate != null) || (mode === 'VIEW' && profileToUpdate != null)) {
            console.warn(profileToUpdate);
            profileToUpdate.disablePassowrdField = false;
            profileToUpdate.availableLicenceCount = profileToUpdate.company.availableLicenceCount;
            profileToUpdate.allocatedLicenceCount = profileToUpdate.company.allocatedLicenceCount;
            // setFieldValue('disablePassowrdField', false);
            let images = [];
            const contentType = 'image/png';
            if (profileToUpdate.docPath !== '') {
                const byteCharacters = atob(profileToUpdate?.docPath);
                const byteNumbers = new Array(byteCharacters?.length);
                for (let i = 0; i < byteCharacters?.length; i++) {
                    byteNumbers[i] = byteCharacters?.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob1 = new Blob([byteArray], { type: contentType });
                images.push(URL.createObjectURL(blob1));
                let fileData = new File([blob1], 'name');
                profileToUpdate.files = [fileData];
            }
            profileToUpdate.files = [];
            setLoadValues(profileToUpdate);
            // formikRef.current.setFieldValue('disablePassowrdField', false);
        }
    }, [profileToUpdate]);

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && component === 'user_creation') || (mode === 'VIEW' && component === 'user_creation')) {
            dispatch(getUserDataById(userCode));

            // setTitleListOptions(ti)
        } else if ((mode === 'VIEW_UPDATE' && component === 'user_profile') || (mode === 'VIEW' && component === 'user_profile')) {
            dispatch(getProfileData(userCode));
        }
    }, [mode]);

    const handleSubmitForm = (data) => {
        console.log(data);
        if (component === 'user_creation') {
            if (mode === 'INSERT') {
                console.log(data);
                dispatch(saveUserData(data));
            } else if (mode === 'VIEW_UPDATE') {
                dispatch(saveUserData(data));
            }
        } else if (component === 'user_profile') {
            console.log('user_profile');
            dispatch(updateMyProfile(data));
        }

        handleCloseSubmit();
    };

    const loadAvalibleLicenseCount = (data, setFieldValue) => {
        setFieldValue('availableLicenceCount', data.availableLicenceCount);
        setFieldValue('allocatedLicenceCount', data.allocatedLicenceCount);
    };

    useEffect(() => {
        setTitleListOptions(titleItems);
    }, []);

    return (
        <div>
            <Dialog maxWidth="220px" open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" alignItems="center" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' && component === 'user_creation' ? 'Add Manager' : ''}
                            {mode === 'VIEW_UPDATE' && component === 'user_creation' ? 'Update Manager' : ''}
                            {mode === 'VIEW' && component === 'user_creation' ? 'View Manager' : ''}
                            {component === 'user_profile' ? 'My Profile' : ''}
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
                                                innerRef={formikRef}
                                                enableReinitialize={true}
                                                initialValues={loadValues || initialValues}
                                                onSubmit={(values) => {
                                                    handleSubmitForm(values);
                                                }}
                                                validationSchema={validationSchema}
                                            >
                                                {({
                                                    values,
                                                    handleChange,
                                                    setFieldValue,
                                                    errors,
                                                    handleBlur,
                                                    touched,
                                                    dirty,
                                                    resetForm
                                                }) => {
                                                    return (
                                                        <Form>
                                                            <div style={{ marginTop: '6px', margin: '10px' }}>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 100, md: 250 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            select
                                                                            name="title"
                                                                            label="Title"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.title}
                                                                            error={Boolean(touched.title && errors.title)}
                                                                            helperText={touched.title && errors.title ? errors.title : ''}
                                                                            // MenuProps={{
                                                                            //   PaperProps: { sx: { maxHeight: 120 } },
                                                                            // }}
                                                                        >
                                                                            <MenuItem dense={true} value={'MR.'}>
                                                                                MR.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'MRS.'}>
                                                                                MRS.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'MISS.'}>
                                                                                MISS.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'MS.'}>
                                                                                MS.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'PROF.'}>
                                                                                PROF.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'DR.'}>
                                                                                DR.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'VEN.'}>
                                                                                VEN.
                                                                            </MenuItem>
                                                                        </TextField>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="First Name"
                                                                            name="firstName"
                                                                            onChange={handleChange}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            disabled={mode === 'VIEW'}
                                                                            // disabled={
                                                                            //     component === 'user_creation' && mode === 'INSERT'
                                                                            //         ? false
                                                                            //         : true
                                                                            // }
                                                                            onBlur={handleBlur}
                                                                            value={values.firstName}
                                                                            error={Boolean(touched.firstName && errors.firstName)}
                                                                            helperText={
                                                                                touched.firstName && errors.firstName
                                                                                    ? errors.firstName
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="standard-select-currency"
                                                                            label="Middle Name"
                                                                            name="middleName"
                                                                            onChange={handleChange}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            disabled={mode === 'VIEW'}
                                                                            onBlur={handleBlur}
                                                                            value={values.middleName}
                                                                            error={Boolean(touched.middleName && errors.middleName)}
                                                                            helperText={
                                                                                touched.middleName && errors.middleName
                                                                                    ? errors.middleName
                                                                                    : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            /// disabled={disableDistrict}
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Last Name"
                                                                            name="lastName"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            // disabled={
                                                                            //     component === 'user_creation' && mode === 'INSERT'
                                                                            //         ? false
                                                                            //         : true
                                                                            // }
                                                                            disabled={mode === 'VIEW'}
                                                                            value={values.lastName}
                                                                            error={Boolean(touched.lastName && errors.lastName)}
                                                                            helperText={
                                                                                touched.lastName && errors.lastName ? errors.lastName : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="NIC"
                                                                            name="nic"
                                                                            disabled={mode === 'VIEW'}
                                                                            // disabled={
                                                                            //     component === 'user_creation' && mode === 'INSERT'
                                                                            //         ? false
                                                                            //         : true
                                                                            // }
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.nic}
                                                                            error={Boolean(touched.nic && errors.nic)}
                                                                            helperText={touched.nic && errors.nic ? errors.nic : ''}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Mobile No"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            disabled={mode === 'VIEW'}
                                                                            name="mobile"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.mobile}
                                                                            error={Boolean(touched.mobile && errors.mobile)}
                                                                            helperText={
                                                                                touched.mobile && errors.mobile ? errors.mobile : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 500 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="Email"
                                                                            type="email"
                                                                            name="email"
                                                                            disabled={mode === 'VIEW'}
                                                                            // disabled={
                                                                            //     component === 'user_creation' && mode === 'INSERT'
                                                                            //         ? false
                                                                            //         : true
                                                                            // }
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.email}
                                                                            error={Boolean(touched.email && errors.email)}
                                                                            helperText={touched.email && errors.email ? errors.email : ''}
                                                                        />
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="Role"
                                                                            name="roles"
                                                                            disabled
                                                                            // disabled={
                                                                            //     component === 'user_creation' && mode === 'INSERT'
                                                                            //         ? false
                                                                            //         : true
                                                                            // }
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.roles}
                                                                            // error={Boolean(touched.roles && errors.roles)}
                                                                            // helperText={touched.roles && errors.roles ? errors.roles : ''}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="User Name"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            name="userName"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.userName}
                                                                            error={Boolean(touched.userName && errors.userName)}
                                                                            helperText={
                                                                                touched.userName && errors.userName ? errors.userName : ''
                                                                            }
                                                                            disabled={mode == 'VIEW'}
                                                                            // disabled={
                                                                            //     component === 'user_creation' && mode === 'INSERT'
                                                                            //         ? false
                                                                            //         : true
                                                                            // }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        // display={
                                                                        //     component === 'user_creation' && mode === 'INSERT'
                                                                        //         ? 'flex'
                                                                        //         : 'none'
                                                                        // }
                                                                    >
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Password"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            disabled={mode == 'VIEW'}
                                                                            name="password"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.password}
                                                                            error={Boolean(touched.password && errors.password)}
                                                                            helperText={
                                                                                touched.password && errors.password ? errors.password : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item style={{ marginLeft: '10px' }}>
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
                                                            </div>

                                                            {/* <Box>
                                                                <Grid item>
                                                                    {mode === 'VIEW' ? (
                                                                        <CreatedUpdatedUserDetailsWithTableFormat formValues={values} />
                                                                    ) : null}
                                                                </Grid>
                                                            </Box> */}
                                                            <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                                                {mode != 'VIEW' ? (
                                                                    <Button
                                                                        variant="outlined"
                                                                        type="button"
                                                                        style={{
                                                                            marginLeft: '10px'
                                                                        }}
                                                                        disabled={!dirty}
                                                                        onClick={(e) => resetForm()}
                                                                    >
                                                                        CLEAR
                                                                    </Button>
                                                                ) : (
                                                                    ''
                                                                )}

                                                                {mode != 'VIEW' ? (
                                                                    <Button
                                                                        variant="contained"
                                                                        type="submit"
                                                                        className="btnSave"
                                                                        disabled={!dirty}
                                                                    >
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

export default User;
