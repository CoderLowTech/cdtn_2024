export const adminMenu = [

    { //Quản lí người dùng
        name: 'menu.admin.manage-user',
        menus: [

            {
                name: 'menu.admin.crud-redux', link: '/system/manage-user'
            },

            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            { //Quản lí kế hoạch khám bệnh                
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            }

        ]
    },


    { //Quản lí chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    }
];

export const doctorMenu = [

    {
        name: 'menu.doctor.schedule',
        menus: [
            { //Quản lí kế hoạch khám bệnh
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },
            { //Quản lí lịch hẹn
                name: 'menu.doctor.manage-booking', link: '/doctor/manage-booking'

            }
        ]
    }

];