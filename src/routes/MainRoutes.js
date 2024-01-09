import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import ViewTaxGroup from 'views/pages/master/bankAccount/ViewBankAccount';
import ViewTourCategory from 'views/pages/master/tour_category/ViewTourCategory';
import ViewTourType from 'views/pages/master/tour_type/ViewTourType';
import ViewCodeAndName from 'views/pages/master/code_name/ViewCodeAndName';
import ViewManager from 'views/pages/master/operator/manager/ViewManager';
import ViewMarket from 'views/pages/master/operator/market/ViewMarket';
import ViewMarketGroup from 'views/pages/master/operator/maketGroup/ViewMarketGroup';
import ViewOperatorEntry from 'views/pages/master/operator/operatorEntry/ViewOperatorEntry';
import ViewSeason from 'views/pages/master/season/ViewSeason';

import ViewOwner from 'views/pages/master/owner/ViewOwner';
import ViewProduct from 'views/pages/master/product/ViewProduct';
import ViewExchangeRateTypes from 'views/pages/master/exchange_rate_types/ViewExchangeRateTypes';

import ViewCompanyProfile from 'views/pages/master/company_profile/ViewCompanyProfile';
import ViewUserCreation from 'views/pages/authentication/userManagement/ViewUserCreation';

import ViewManagingComapany from 'views/pages/master/managing_company/ViewManagingCompnay';

import ViewBankDetail from 'views/pages/master/bank_detail/ViewBankDetail';
import ViewBranchDetails from 'views/pages/master/bank/ViewBranchDetails';

import AuthGuard from 'utils/route-guard/AuthGuard';

import Landing from 'views/pages/landing';

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
    // element: (
    //     <AuthGuard>
    //         <MainLayout />
    //     </AuthGuard>
    // ),
    children: [
        // {
        //     path: '/',
        //     element: <DashboardDefault />
        // },
        {
            path: '/pages/usermanagement/usercreation',
            element: <ViewUserCreation />
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
                    path: 'customer',
                    element: <ViewCustomer />
                },
                {
                    path: 'tourtypeview',
                    element: <ViewTourType />
                },
                {
                    path: 'tourcategoryview',
                    element: <ViewTourCategory />
                },
                {
                    path: 'codeandnameview',
                    element: <ViewCodeAndName />
                },
                {
                    path: 'managerview',
                    element: <ViewManager />
                },
                {
                    path: 'marketview',
                    element: <ViewMarket />
                },
                {
                    path: 'marketgroupview',
                    element: <ViewMarketGroup />
                },

                {
                    path: 'seasonview',
                    element: <ViewSeason />
                },

                {
                    path: 'productview',
                    element: <ViewProduct />
                },
                {
                    path: 'exchangeratetypeview',
                    element: <ViewExchangeRateTypes />
                },

                {
                    path: 'companyprofileview',
                    element: <ViewCompanyProfile />
                },
                {
                    path: 'onlinebanking',
                    element: <ViewOnlinebanking />
                },

                {
                    path: 'managingCompanyview',
                    element: <ViewManagingComapany />
                },
                {
                    path: 'bankaccounts',
                    element: <ViewBankAccount />
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
