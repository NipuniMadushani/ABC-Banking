import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import ViewManager from 'views/pages/master/operator/manager/ViewManager';

import ViewUserCreation from 'views/pages/authentication/userManagement/ViewUserCreation';

import ViewBankDetail from 'views/pages/master/bank_detail/ViewBankDetail';
import ViewBranchDetails from 'views/pages/master/bank/ViewBranchDetails';

import ViewOnlinebanking from 'views/pages/master/onlineBanking/ViewOnlinebanking';
import ViewCustomer from 'views/pages/master/customer/ViewCustomer';
import ViewBankAccount from 'views/pages/master/bankAccount/ViewBankAccount';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,

    children: [
        {
            path: '/pages/usermanagement/usercreation',
            element: <ViewUserCreation />
        },
        {
            path: '/pages/usermanagement/customer',
            element: <ViewCustomer />
        },

        {
            path: '/pages/usermanagement/bankaccounts',
            element: <ViewBankAccount />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },

        // iTos3
        {
            path: 'master',
            children: [
                {
                    path: 'onlinebanking',
                    element: <ViewOnlinebanking />
                },

                {
                    path: 'bankbranches',
                    element: <ViewBranchDetails />
                }
            ]
        }
    ]
};

export default MainRoutes;
