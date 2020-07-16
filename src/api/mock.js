const data = [
  {
    name: '系统',
    path: '/system',
    hidden: false,
    component:'Main',
    meta:{'icon':'el-icon-message'},
    children: [
      {
        name: '部门管理',
        path: '/system/dept',
        component: 'system/dept/Department',
        hidden: false,
        meta:{'icon':'el-icon-message'},
      },
      {
        name: '用户管理',
        path: '/system/user',
        component: 'system/user/User',
        hidden: false,
        meta:{'icon':'el-icon-loading'},
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: 'system/role/Role',
        hidden: false,
        meta:{'icon':'el-icon-message'},
      },
      {
        name: '资源管理',
        path: '/system/res',
        component: 'system/Resource',
        hidden: false,
        meta:{'icon':'el-icon-message'},
      },
      {
        name: '字典管理',
        path: '/system/dict',
        component: 'system/Dict',
        hidden: false,
        meta:{'icon':'el-icon-message'},
      },
      {
        name: '任务调度',
        path: '/system/timing',
        component: 'system/Timing',
        hidden: false,
        meta:{'icon':'el-icon-message'},
      }
    ]
  },
  {
    name: '营销',
    path: '/marketing',
    hidden: false,
    component:'Main',
    children:[
      {
        name: '优惠券',
        path: '/marketing/coupon',
        component: 'marketing/Coupon',
        hidden: false
      },
      {
        name: '活动管理',
        path: '/marketing/activity',
        component: 'marketing/Activity',
        hidden: false
      },
      {
        name: '促销管理',
        path: '/marketing/promotion',
        component: 'marketing/Promotion',
        hidden: false
      }
    ]
  },
  {
    name: '订单',
    path: '/order',
    hidden: false,
    component:'Main',
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
  },
  { name: '监控',
    path: '/monitor',
    hidden: false,
    component:'Main',
    children:[
      {
        name: '在线用户',
        path: '/monitor/online',
        component: 'monitor/Online',
        hidden: false
      },
      {
        name: '操作日志',
        path: '/monitor/log',
        component: 'monitor/OperLog',
        hidden: false
      },
      {
        name: '异常日志',
        path: '/monitor/error',
        component: 'monitor/ErrorLog',
        hidden: false
      },
      {
        name: '服务监控',
        path: '/monitor/server',
        component: 'monitor/Server',
        hidden: false
      },
    ]
  }
];

export default data;