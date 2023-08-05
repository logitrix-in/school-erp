export const navigations = [

    {
        name: 'dashboard',
        path: 'dashboard/',
        icon: 'bxs:dashboard'
    },
    {
        name: 'admission',
        path: 'admission/',
        dropdown: true,
        icon: 'material-symbols:other-admission',
        subMenu: [
            {
                name:'Application',
                path: 'admission/application',
                icon: 'mdi:application'
            },
            {
                name:'Screening',
                path: 'admission/Screening',
                icon: 'carbon:chart-evaluation'
            },
            {
                name:'Test Center',
                path: 'admission/Test_Center',
                icon: 'ic:round-place'
            },
            {
                name:'Onboarding',
                path: 'admission/Onboarding',
                icon: 'material-symbols:other-admission'
            },
        ]
    },
    {
        name:'Library',
        path: 'Library/',
        icon: 'solar:library-bold-duotone',
        dropdown: true,
        subMenu: [
            {
                name:'menu 1',
                path: 'library/menu1',
                icon: 'material-symbols:folder'
            },
            {
                name:'menu 2',
                path: 'library/menu2',
                icon: 'material-symbols:folder'
            }
        ]
    },
    {
        name:'Utilities',
        path: 'Utilities/',
        icon: 'solar:document-bold'
    },
    {
        name:'Manage Access',
        path: 'access_control/',
        icon: 'ic:baseline-manage-accounts'
    },
    {
        name:'Feedback',
        path: 'Feedback/',
        icon: 'material-symbols:feedback'
    },
]

