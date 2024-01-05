import { useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table';

import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { getAllUserDetails, getLatestModifiedUserDetails } from 'store/actions/authenticationActions/UserAction';
import User from './UserCreation';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import AlertModelClose from 'messages/AlertModelClose';

function ViewUserCreation() {
    const [open, setOpen] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const [openConfirmationModel, setOpenConfirmationModel] = useState(false);
    const columns = [
        {
            title: 'User Name',
            field: 'userName',
            filterPlaceholder: 'User Name',
            align: 'left'
        },
        {
            title: 'First Name',
            field: 'firstName',
            filterPlaceholder: 'First Name',
            align: 'left'
        },
        {
            title: 'Last Name',
            field: 'lastName',
            align: 'left',
            grouping: false,
            filterPlaceholder: 'Last Name'
        },
        {
            title: 'NIC',
            field: 'nic',
            align: 'left',
            grouping: false,
            filterPlaceholder: 'NIC'
        },
        {
            title: 'Email',
            field: 'email',
            align: 'left',
            grouping: false,
            filterPlaceholder: 'Email'
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

    const dispatch = useDispatch();
    const error = useSelector((state) => state.userReducer.errorMsg);
    const users = useSelector((state) => state.userReducer.users);
    const user = useSelector((state) => state.userReducer.user);
    const lastModifiedDate = useSelector((state) => state.userReducer.lastModifiedDateTime);
    const myProfileUpdate = useSelector((state) => state.userReducer.myProfileUpdate);

    useEffect(() => {
        setLastModifiedTimeDate(lastModifiedDate);
    }, [lastModifiedDate]);

    useEffect(() => {
        if (users?.length > 0) {
            setTableData(users);
        }
    }, [users]);

    useEffect(() => {
        if (error != null) {
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        if (user) {
            setHandleToast(true);
            dispatch(getAllUserDetails('MANAGER'));
        }
    }, [user]);

    useEffect(() => {
        dispatch(getAllUserDetails('MANAGER'));
    }, []);

    const handleClickOpen = (type, data) => {
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setUserCode(data.userId);
        } else if (type === 'INSERT') {
            setUserCode('');
            setMode(type);
        } else {
            setMode(type);
            setUserCode(data.userId);
        }
        setOpen(true);
    };

    const handleClose = () => {
        mode === 'VIEW' ? setOpen(false) : setOpenConfirmationModel(true);
    };

    const handleToast = () => {
        setHandleToast(false);
    };
    const handleErrorToast = () => {
        setOpenErrorToast(false);
    };
    const handleCloseModel = (status) => {
        if (status == true) {
            setOpen(false);
            setOpenConfirmationModel(false);
        } else {
            setOpenConfirmationModel(false);
        }
    };

    const handleCloseSubmit = () => {
        setOpen(false);
    };

    return (
        <div>
            <MainCard title={<div className="title">Bank Manager</div>}>
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
                                        exportFileName: 'Managers Details',
                                        actionsColumnIndex: -1,
                                        columnsButton: true,
                                        headerStyle: {
                                            whiteSpace: 'nowrap',
                                            height: 20,
                                            maxHeight: 20,
                                            padding: 2,
                                            fontSize: '14px',
                                            background: '-moz-linear-gradient(top, #0790E8, #3180e6)',
                                            background: '-ms-linear-gradient(top, #0790E8, #3180e6)',
                                            background: '-webkit-linear-gradient(top, #0790E8, #3180e6)',
                                            // textAlign: 'center',
                                            color: '#FFF',
                                            textAlign: 'center'
                                        },
                                        rowStyle: {
                                            whiteSpace: 'nowrap',
                                            height: 20,
                                            fontSize: '13px',
                                            padding: 0
                                        }
                                    }}
                                />

                                {open ? (
                                    <User
                                        open={open}
                                        handleClose={handleClose}
                                        userCode={userCode}
                                        mode={mode}
                                        component="user_creation"
                                        handleCloseSubmit={handleCloseSubmit}
                                    />
                                ) : (
                                    ''
                                )}
                                {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
                                {openErrorToast ? (
                                    <ErrorMsg openToast={openErrorToast} handleToast={setOpenErrorToast} mode={mode} />
                                ) : null}
                                {openConfirmationModel ? (
                                    <AlertModelClose title="dev" open={openConfirmationModel} handleCloseModel={handleCloseModel} />
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

export default ViewUserCreation;
