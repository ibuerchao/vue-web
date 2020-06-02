const data = [
  {
    name: '系统',
    path: '/system',
    hidden: false,
    component:'system/System',
    meta:{'icon':'el-icon-message'},
    children: [
      {
        name: '部门管理',
        path: '/system/dept',
        component: 'system/Department',
        hidden: false,
        meta:{'icon':'el-icon-message'},
      },
      {
        name: '用户管理',
        path: '/system/user',
        component: 'system/User',
        hidden: false,
        meta:{'icon':'el-icon-loading'},
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: 'system/Role',
        hidden: false,
        meta:{'icon':'el-icon-message'},
      },
      {
        name: '资源管理',
        path: '/system/res',
        component: 'system/Resource',
        hidden: false,
        meta:{'icon':'el-icon-message'},
      }
    ]
  },
  {
    name: '营销',
    path: '/marketing',
    redirect:'/marketing/coupon',
    hidden: false,
    component:'system/System',
    children:[
      {
        name: '优惠券',
        path: '/marketing/coupon',
        component: 'marketing/Coupon',
        hidden: false
      },
      {
        name: '活动',
        path: '/marketing/activity',
        component: 'marketing/Activity',
        hidden: false
      }
    ]
  },
  {
    name: '订单',
    path: '/order',
    redirect:'/order/normal',
    hidden: false,
    component:'system/System',
    children:[
      {
        name: '正向订单',
        path: '/order/normal',
        component: 'order/Normal',
        hidden: false
      },
      {
        name: '逆向订单',
        path: '/order/refund',
        component: 'order/Refund',
        hidden: false
      }
    ]
  }
];

export default data;