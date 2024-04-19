export const adminMenu = [

    { //Quản lí người dùng
        name: 'menu.admin.manage-user',
        menus: [

            {
                name: 'menu.admin.crud-redux', link: '/system/manage-user'
            },

            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'

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

            },
            { //Lịch sử lịch hẹn
                name: 'menu.doctor.history', link: '/doctor/history'

            }
        ]
    }

];