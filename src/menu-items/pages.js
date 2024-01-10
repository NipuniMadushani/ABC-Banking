// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    // title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Account Management',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'register3',
                    title: 'Bank Managers',
                    type: 'item',
                    url: '/pages/usermanagement/usercreation',
                    breadcrumbs: false
                },
                {
                    id: 'customer-id',
                    title: 'Customer',
                    type: 'item',
                    url: '/pages/usermanagement/customer',
                    breadcrumbs: false
                },
                {
                    id: 'bank-detail-id',
                    title: 'Bank Accounts',
                    type: 'item',
                    url: '/pages/usermanagement/bankaccounts',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default pages;
