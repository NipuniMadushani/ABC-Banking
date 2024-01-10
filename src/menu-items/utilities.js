// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    // title: 'Master Setup',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Transaction Management',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'department-designation-id',
                    title: 'Transactions',
                    type: 'item',
                    url: '/master/onlinebanking',
                    breadcrumbs: false
                },

                {
                    id: 'bank-branch-id',
                    title: 'Bank & Branches',
                    type: 'item',
                    url: '/master/bankbranches',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
